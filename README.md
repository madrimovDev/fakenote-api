# Fake Note Backend API Documentation

## Backendning asosiy vazifalari

1. Foydalanuvchilarning registratsiyasi: Foydalanuvchilar yangi hisob yaratish imkoniyatiga ega bo'ladi.

2. Foydalanuvchilarning autentifikatsiyasi: Foydalanuvchilarni identifikatsiya qilish va autentifikatsiya jarayonini amalga oshirish uchun JWT (JSON Web Token) ishlatish.

3. Note-lar to'plamini yaratish: Foydalanuvchilar o'ziga xos note-larni saqlash uchun to'plamlar yaratish imkoniyatiga ega bo'ladi.

4. Note-larni yaratish, ko'rish, tahrirlash va o'chirish (CRUD): Foydalanuvchilar note-lar yaratish, o'zgartirish va o'chirish imkoniyatiga ega bo'ladi.

5. Collection-larni yaratish: Foydalanuvchilar yangi to'plamlar yaratish imkoniyatiga ega bo'ladi.

---

## Endpointlar

### [`/auth`](#authorization)

Foydalanuvchi autentifikatsiyasi bilan bog'liq endpointlar.

### [`/note`](#note-1)

Note-lar bilan bog'liq endpointlar.

### [`/profile`](#profile)

Foydalanuvchi profilini boshqarishga oid endpointlar.

### `/collection`

To'plamlar bilan bog'liq endpointlar.

---

## Authorization

### `POST /api/v1/auth/register`

Foydalanuvchi hisobini yangilash uchun yangi hisob yaratish.

**Request Body:**

```json
{
	"name": "Foydalanuvchi Ismi",
	"surname": "Foydalanuvchi Familiyasi",
	"username": "foydalanuvchi_ismi",
	"password": "parol123",
	"email": "foydalanuvchi@email.com"
}
```

**Response:**

```json
{
	"message": "User registered",
	"user": {
		"name": "Foydalanuvchi Ismi",
		"surname": "Foydalanuvchi Familiyasi",
		"username": "foydalanuvchi_ismi",
		"email": "foydalanuvchi@email.com"
	},
	"accessToken": "[Access Token]",
	"refreshToken": "[Refresh Token]"
}
```

### `POST /api/auth/login`

Foydalanuvchi autentifikatsiyasi uchun kirish.

**Request Body:**

```json
{
	"username": "foydalanuvchi_ismi",
	"password": "parol123"
}
```

**Response:**

```json
{
	"message": "User registered",
	"user": {
		"name": "Foydalanuvchi Ismi",
		"surname": "Foydalanuvchi Familiyasi",
		"username": "foydalanuvchi_ismi"
	},
	"accessToken": "[Access Token]",
	"refreshToken": "[Refresh Token]"
}
```

### `GET /api/auth/verify`

Foydalanuvchi autentifikatsiyasini tekshirish.

**Request Headers:**

```json
Authorization: [Access Token]
```

**Response:**

```json
{
	"message": "Verified",
	"user": {
		"name": "Foydalanuvchi Ismi",
		"surname": "Foydalanuvchi Familiyasi",
		"username": "foydalanuvchi_ismi"
	}
}
```

### `POST /api/auth/refresh`

Access Token-ni yangilash.

**Request Headers:**

```json
  Authorization: [Refresh Token]
```

**Response:**

```json
{
	"message": "Refresh Access Token",
	"accessToken": "[New Access Token]"
}
```

---

## Note

### `GET /note`

Barcha note-larni olish.

**Response:**

```json
{
	"message": "All Notes",
	"notes": [
		{
			"id": 1,
			"title": "Note sarlavhasi",
			"description": "Note tavsifi"
		},
		{
			"id": 2,
			"title": "Boshqa note",
			"description": "Boshqa note tavsifi"
		}
	]
}
```

### `GET /api/note/:noteId`

Berilgan ID bo'yicha bir note-ni olish.

**Response:**

```json
{
	"message": "Note",
	"note": {
		"id": 1,
		"title": "Note sarlavhasi",
		"description": "Note tavsifi"
	}
}
```

### `POST /note`

Yangi note yaratish.

**Request Body:**

```json
{
	"title": "Note sarlavhasi",
	"description": "Note tavsifi"
}
```
**Request File:** (Optional*)

- **field:** img
- **format:** jpg, jpeg, png

