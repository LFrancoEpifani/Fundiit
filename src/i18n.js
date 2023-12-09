// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "calendar": "Cartelera",
          "explore": "Accede al mundo",
            "the": "de los",
            "experience": "eventos",
            "found": "Encuéntralos con",
            "click": "un solo click.",
            "search": "Buscar Eventos",
            "create": "Crear Evento",
            "art": "Arte",
            "music": "Música",
            "dance": "Baile",
            "alternative": "Alternativo",
            "literature": "Literatura",
            "all": "Todos",
            "title": "Título",
            "description": "Descripción",
            "address": "Dirección",
            "date": "Fecha",
            "price": "Precio",
            "schedule": "Horario",
            "category": "Categoria",
            "exito": "Éxito!",
            "upload": "Se ha publicado tu evento!",
            "delete": 'Eliminar evento',
            "edit": "Editar Evento",
            "teatro": "Teatro",
            "lenguage": "Idioma",
            "home": "Inicio",
            "events": "Eventos",
            "user": "Usuario",
            "creating": "Crear",
            "close": "Cerrar sesión"
        }
      },
      es: {
        translation: {
          "calendar": "Events",
          "explore": "Explore a world",
          "the": "of",
          "experience": "events",
          "found": "Find them with",
          "click": "one click.",
          "search": "Search Events",
        "create": "Create Event",
        "art": "Art",
        "music": "Music",
        "dance": "Dance",
        "alternative": "Alternative",
        "literature": "Literature",
        "all": "All",
        "title": "Title",
        "description": "Description",
        "address": "Adress",
          "date": "Date",
          "price": "Price",
            "schedule": "Schedule",
            "category": "Category",
            "exito": "Sucess!",
            "upload": "Your event is published!",
            "delete": 'Delete event',
            "edit": "Edit Event",
            "teatro": "Theater",
            "lenguage": "Lenguage",
            "home": "Home",
            "events": "Events",
            "user": "User",
            "creating": "Create",
            "close": "Logout"
        }
      }
    },
    lng: "en", // idioma inicial
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
