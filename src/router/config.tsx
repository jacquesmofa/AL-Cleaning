import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import ServicesHub from "@/pages/services/page";
import ServiceDetail from "@/pages/services/detail/page";
import About from "@/pages/about/page";
import ReviewsPage from "@/pages/reviews/page";
import AreasHub from "@/pages/areas/page";
import CityDetail from "@/pages/areas/detail/page";
import QuotePage from "@/pages/quote/page";
import ContactPage from "@/pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <ServicesHub />,
  },
  {
    path: "/services/:serviceId",
    element: <ServiceDetail />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/areas",
    element: <AreasHub />,
  },
  {
    path: "/areas/:cityId",
    element: <CityDetail />,
  },
  {
    path: "/quote",
    element: <QuotePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;