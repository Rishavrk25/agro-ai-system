import { createContext, useContext } from "react";

const TabsContext = createContext({ value: "", onValueChange: () => {} });

export function Tabs({
  value,
  onValueChange,
  className = "",
  children,
  ...props
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-muted p-1 gap-1 ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}) {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onValueChange?.(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className = "",
  children,
  ...props
}) {
  const { value: activeValue } = useContext(TabsContext);

  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={`mt-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
