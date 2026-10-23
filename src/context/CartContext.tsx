
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ProductToAdd = {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
  thumbnail?: string;
  images?: string[];
  size?: string;
  color?: string;
  quantity?: number;
};

export type CartItem = {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: ProductToAdd, quantity?: number) => void;
  updateQuantity: (
    id: string,
    type: 'increase' | 'decrease',
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add product or increase quantity if it already exists
  const addToCart = useCallback(
    (product: ProductToAdd, quantity = 1) => {
      const id = String(product.id);
      const safeQuantity = Math.max(
        1,
        Math.floor(Number(quantity) || 1),
      );

      const image =
        product.image ||
        product.thumbnail ||
        product.images?.[0] ||
        '';

      const price = Number(product.price) || 0;

      setCartItems(previous => {
        const existingItem = previous.find(
          item => item.id === id,
        );

        if (existingItem) {
          return previous.map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + safeQuantity,
                }
              : item,
          );
        }

        const newItem: CartItem = {
          id,
          name: product.name,
          size: product.size || 'Standard',
          color: product.color || 'Default',
          price,
          quantity: safeQuantity,
          image,
        };

        return [...previous, newItem];
      });
    },
    [],
  );

  // Increase or decrease product quantity
  const updateQuantity = useCallback(
    (id: string, type: 'increase' | 'decrease') => {
      setCartItems(previous =>
        previous.map(item => {
          if (item.id !== id) {
            return item;
          }

          const newQuantity =
            type === 'increase'
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return {
            ...item,
            quantity: newQuantity,
          };
        }),
      );
    },
    [],
  );

  // Remove one product from cart
  const removeFromCart = useCallback((id: string) => {
    setCartItems(previous =>
      previous.filter(item => item.id !== id),
    );
  }, []);

  // Clear the complete cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total quantity of all products
  const itemCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  );

  // Total price before delivery charges or discounts
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const contextValue = useMemo(
    () => ({
      cartItems,
      itemCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cartItems,
      itemCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Use this hook inside screens and components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      'useCart must be used inside CartProvider. Wrap your app with CartProvider.',
    );
  }

  return context;
};
