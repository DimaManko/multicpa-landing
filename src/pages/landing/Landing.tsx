import { useParams, Navigate } from "react-router"
import { isLocale } from "@/shared/config/locales"

import NotFoundPage from "../not-found"

const LandingPage = () => {
    const {lang } = useParams()
    if (lang === 'en') {
        return <Navigate to="/" replace />
    };
    if (lang && !isLocale(lang)) {
        return <NotFoundPage />
    };
    return <h1>Landing: {lang ?? 'en'}</h1>;
}

export default LandingPage