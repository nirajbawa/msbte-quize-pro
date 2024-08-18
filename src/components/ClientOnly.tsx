import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
