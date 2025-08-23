# Konfiguracja Pass Through dla PrimeVue

Ten folder zawiera konfiguracje Pass Through dla komponentów PrimeVue, które pozwalają na dostosowanie stylów komponentów przy użyciu klas Tailwind CSS.

## Struktura folderów

```
primevue/
├── index.js                 # Główny plik z importami wszystkich konfiguracji
├── components/              # Folder z konfiguracjami poszczególnych komponentów
│   ├── button.js           # Konfiguracja dla Button
│   ├── inputtext.js        # Konfiguracja dla InputText
│   ├── datatable.js        # Konfiguracja dla DataTable
│   └── ...                 # Inne komponenty
└── README.md               # Ten plik
```

## Jak dodać nowy komponent

1. Utwórz nowy plik w folderze `components/` np. `dropdown.js`
2. Eksportuj konfigurację Pass Through:

```javascript
// primevue/components/dropdown.js
export const dropdownPassThrough = {
  root: {
    class: [
      'relative',
      'inline-flex',
      // ... inne klasy Tailwind
    ]
  },
  // ... inne elementy komponentu
}
```

3. Dodaj import w `primevue/index.js`:

```javascript
import { dropdownPassThrough } from './components/dropdown'

export const primeVuePassThrough = {
  dropdown: dropdownPassThrough,
  // ... inne komponenty
}
```

4. Zaktualizuj `nuxt.config.ts` (jeśli jeszcze nie jest skonfigurowany):

```javascript
import { primeVuePassThrough } from './primevue'

export default defineNuxtConfig({
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      pt: primeVuePassThrough, // Dodaj tę linię
    },
  },
})
```

## Użycie w komponentach

### Globalna konfiguracja (zalecane)
Gdy konfiguracja jest dodana do `nuxt.config.ts`, wszystkie komponenty automatycznie używają stylów Pass Through.

```vue
<template>
  <Button label="Zapisz" severity="primary" />
  <!-- Automatycznie używa stylów z buttonPassThrough -->
</template>
```

### Lokalna konfiguracja
Możesz też użyć konfiguracji lokalnie w konkretnym komponencie:

```vue
<template>
  <Button 
    label="Zapisz" 
    severity="primary" 
    :pt="customButtonStyles"
  />
</template>

<script setup>
import { buttonPassThrough } from '~/primevue/components/button'

// Możesz rozszerzyć lub nadpisać style
const customButtonStyles = {
  ...buttonPassThrough,
  root: {
    class: [
      ...buttonPassThrough.root.class,
      'my-custom-class'
    ]
  }
}
</script>
```

## Dokumentacja PrimeVue Pass Through

- [Oficjalna dokumentacja Pass Through](https://primevue.org/passthrough/)
- [Button Pass Through](https://primevue.org/button/#pt)
- [InputText Pass Through](https://primevue.org/inputtext/#pt)
- [DataTable Pass Through](https://primevue.org/datatable/#pt)

## Zasady stylowania

1. **Używaj klas Tailwind CSS** - wszystkie style powinny być oparte na Tailwind
2. **Zachowaj spójność** - używaj podobnych wzorców kolorów i odstępów
3. **Responsywność** - dodawaj prefiksy responsive (sm:, md:, lg:, xl:)
4. **Dostępność** - pamiętaj o focus states i aria attributes
5. **Dokumentuj** - dodawaj komentarze wyjaśniające nietypowe rozwiązania 