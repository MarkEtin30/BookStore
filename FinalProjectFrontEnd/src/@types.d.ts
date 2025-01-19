export type BookType = {

id: number;
title: string;
price: number;
description: string;
imageUrl: string;
language: string;
author: string;
publisher: string;
publicationDate:string;
categories: CategoryType[];  // Array of Categories associated with this book
quantity: number;
}


export type CategoryType = {
    id: number;
    name: string;
};





export type OrderType = {
    orderId: number;
    userId: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    orderItems: OrderItemType[];
};

export type OrderItemType = {
    orderItemId:number;
    orderId: number;
    bookId: number;
    quantity: number;
    priceAtTimeOfPurchase: number;
};






// src/@types.ts or another relevant types file
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  
  export interface CartContextType {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
  }
  
 
// User Type with nested Orders
export type UserType = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  orders: OrderType[];
  roles: string;
  imageUrl:string;
  
};


// user type for update!
export type UserTypeForUpdate = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  roles: string;
  imageUrl: string;
};



// User Type with nested Orders
export type UserTypeForCreatingNewUser = {

  email: string;
  username: string;
  password: string;

};
// {
//   "email": "user@example.com",
//   "username": "string",
//   "password": "string"
// }