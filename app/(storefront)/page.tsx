import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProdcuts";
import { Hero } from "../components/storefront/Hero";

export default function IndexPage() {
    return (
        <div>
            <Hero />
            <CategoriesSelection />
            <FeaturedProducts />
        </div>
    )
}