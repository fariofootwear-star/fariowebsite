export interface Product {
    id: number;
    name: string;
    category: 'shoes' | 'socks' | 'bags';
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isSale?: boolean;
    colors: string[];
    sizes: string[];
    description: string;
    gallery?: string[];
    video?: string;
}
