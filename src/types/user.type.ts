import { IGear } from "./gear.type";
import { Role, UserStatus } from "./type";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  phone: string | null;     // Optional fields in Prisma are nullable
  address: string | null;   // Optional fields in Prisma are nullable
  createdAt: Date;          // Prisma DateTime maps to JavaScript Date
  updatedAt: Date;

  // Relations (Optional fields for included data)
  gears?: IGear[];
  // reviews?: Review[];
  // customerOrders?: RentalOrder[];
  // providerOrders?: RentalOrder[];
}