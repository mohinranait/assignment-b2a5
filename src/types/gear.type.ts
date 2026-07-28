import { ICategory } from "./categoriy.type";
import { IUser } from "./user.type";

export interface IGear {
  id: string;
  providerId: string;
  categoryId: string;
  title: string;
  brand: string | null;       // Optional fields in Prisma are nullable
  description: string | null; // Optional fields in Prisma are nullable
  pricePerDay: number;        // Prisma Int maps to TypeScript number
  stock: number;
  images: string[];
  status: boolean;
  createdAt: Date;            // Prisma DateTime maps to JavaScript/TypeScript Date
  updatedAt: Date;
  
  // Relations (Optional: omit these if you only need the raw database fields)
  provider?: IUser;
  category?: ICategory;
  // rentalOrders?: RentalOrder[];
  // reviews?: Review[];
}