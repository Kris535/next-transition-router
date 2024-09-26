import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import * as next_dist_shared_lib_app_router_context_shared_runtime from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import NextLink from 'next/link';

type Stage = "leaving" | "entering" | "none";
type TransitionCallback = (next: () => void, from?: string, to?: string) => Promise<(() => void) | void> | ((() => void) | void);
interface TransitionRouterProps {
    children: ReactNode;
    leave?: TransitionCallback;
    enter?: TransitionCallback;
    auto?: boolean;
}
type NavigateProps = (href: string, pathname: string, method?: "push" | "replace" | "back", options?: NavigateOptions) => void;
declare function TransitionRouter({ children, leave, enter, auto, }: TransitionRouterProps): react_jsx_runtime.JSX.Element;
declare function useTransitionState(): {
    stage: Stage;
    navigate: NavigateProps;
    isReady: boolean;
};

declare function useTransitionRouter(): {
    push: (href: string, options?: NavigateOptions) => void;
    replace: (href: string, options?: NavigateOptions) => void;
    back: () => void;
    forward(): void;
    refresh(): void;
    prefetch(href: string, options?: next_dist_shared_lib_app_router_context_shared_runtime.PrefetchOptions): void;
};

declare function Link(props: React.ComponentProps<typeof NextLink>): react_jsx_runtime.JSX.Element;

export { Link, TransitionRouter, useTransitionRouter, useTransitionState };
