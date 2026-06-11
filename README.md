# PostManager — JSONPlaceholder Angular App

Angular 17 aplikacija za upravljanje postovima koristeći [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.

## Funkcionalnosti

- ✅ **Pregled svih postova** — grid prikaz sa paginacijom
- 🔍 **Pretraga** — filtriranje po naslovu, sadržaju ili ID-u
- 👁 **Detalji posta** — prikaz kompletnog posta
- ➕ **Kreiranje** — forma za novi post (Create)
- ✏️ **Uređivanje** — izmjena postojećeg posta (Update)
- 🗑 **Brisanje** — sa potvrdom (Delete)

## Tehnologije

- **Angular 17** (standalone components, signals-ready)
- **TypeScript**
- **SCSS**
- **JSONPlaceholder REST API**
- **Vercel** (hosting)

## Lokalno pokretanje

```bash
npm install
ng serve
```

Aplikacija se otvara na `http://localhost:4200`.

## Build

```bash
ng build --configuration production
```

## Struktura projekta

```
src/app/
├── models/
│   └── post.model.ts
├── services/
│   └── post.service.ts
└── components/
    ├── post-list/
    ├── post-detail/
    └── post-form/
```

---

SSA aktivnost — Višnja Mladenović
