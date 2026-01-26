# Halaqy – React Dashboard Integration Manual

This document explains how to integrate the **Halaqy Owner Dashboard** with **Supabase** using **React**.  
It is intended for frontend developers and describes the full flow, required RPCs, and example usage.

---

## 1. Architecture Overview

- React communicates directly with Supabase using `@supabase/supabase-js`.
- All business logic lives in PostgreSQL RPCs (`SECURITY DEFINER`).
- React is responsible only for:
  - Authentication state
  - Calling RPCs
  - Uploading files to Storage
  - Rendering UI

**No direct table access from React is required.**

---

## 2. Authentication & Role Promotion

After user registration or first login, promote the user to an **owner**.

```ts
await supabase.rpc("promote_me_to_owner");
```

Frontend should block dashboard access unless the user role is `owner`.

---

## 3. Create or Update Shop

Each owner manages exactly **one shop**.

```ts
const { data: shopId } = await supabase.rpc("upsert_my_shop", {
  p_name: name,
  p_description: description,
  p_address_text: address,
  p_latitude: lat,
  p_longitude: lng,
  p_seat_count: seats,
});
```

Store `shopId` in global state (context / store).  
All following RPCs depend on it.

---

## 4. Weekly Schedule

The UI should produce **one entry per weekday**.

```ts
await supabase.rpc("set_shop_schedule", {
  p_shop_id: shopId,
  p_days: [
    { day_of_week: 0, open_time: "09:00", close_time: "22:00", is_closed: false },
    { day_of_week: 5, is_closed: true }
  ]
});
```

- `day_of_week`: 0 = Sunday, 6 = Saturday

---

## 5. Services Management

Services are **replaced as a full list**.

```ts
await supabase.rpc("replace_shop_services", {
  p_shop_id: shopId,
  p_services: [
    { name: "Hair Cut", description: "Standard cut", duration_minutes: 30, price: 15 },
    { name: "Beard Trim", duration_minutes: 15, price: 8 }
  ]
});
```

This simplifies frontend logic (no diffing required).

---

## 6. Photo Upload (Storage + RPC)

1. Upload images to Supabase Storage
2. Save ordered URLs using RPC

```ts
const uploads = [];

for (let i = 0; i < files.length; i++) {
  const path = `${shopId}/${crypto.randomUUID()}.jpg`;
  await supabase.storage.from("shop-photos").upload(path, files[i]);

  const { data } = supabase.storage.from("shop-photos").getPublicUrl(path);
  uploads.push({ image_url: data.publicUrl, order_index: i });
}

await supabase.rpc("replace_shop_photos", {
  p_shop_id: shopId,
  p_photos: uploads
});
```

> If privacy is required, use **signed URLs** and store the file path instead.

---

## 7. Bookings Dashboard

Fetch bookings optimized for owner view.

```ts
const { data } = await supabase.rpc("get_owner_bookings", {
  p_shop_id: shopId,
  p_status: "pending"
});

setBookings(data.bookings);
```

### Booking Actions

```ts
await supabase.rpc("update_booking_status", {
  p_booking_id: bookingId,
  p_status: "approved" // or "declined" | "cancelled"
});
```

---

## 8. Reviews Screen

Reviews are **read-only** and paginated.

```ts
const { data } = await supabase.rpc("get_owner_reviews", {
  p_shop_id: shopId,
  p_limit: 20,
  p_offset: page * 20
});
```

---

## 9. Recommended Frontend Flow

1. Login / Sign up  
2. `promote_me_to_owner()`  
3. Create shop → save `shopId`  
4. Set weekly schedule  
5. Set services  
6. Upload photos  
7. Open dashboard (bookings & reviews)

This prevents partial or invalid shop states.

---

## 10. Security Notes

- RPCs are `SECURITY DEFINER`
- Ownership checks are enforced server-side
- Never expose `service_role` key to frontend
- Do not trust client-side role checks
- Prefer signed URLs for private media

---

## 11. Suggested Frontend Stack

- React + TypeScript
- React Query / TanStack Query
- Zustand / Redux Toolkit
- Supabase JS v2

---

**End of Manual**
