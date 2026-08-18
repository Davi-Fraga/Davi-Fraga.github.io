import type { ReactNode } from "react";

interface SkipLinkProps {
  targetId?: string;
  children?: ReactNode;
}

export function SkipLink({
  targetId = "main-content",
  children = "Pular para o conteúdo principal",
}: SkipLinkProps): React.JSX.Element {
  return (
    <a className="skip-link" href={`#${targetId}`}>
      {children}
    </a>
  );
}
