/** @jsxImportSource react */
import { useState, useCallback, useRef, useEffect } from 'react';
import { ALGOLIA } from '../config';
import '@docsearch/css';
import './Search.css';

import { createPortal } from 'react-dom';
import * as docSearchReact from '@docsearch/react';

/** FIXME: This is still kinda nasty, but DocSearch is not ESM ready. */
const DocSearchModal =
  docSearchReact.DocSearchModal ||
  (docSearchReact as any).default.DocSearchModal;
const useDocSearchKeyboardEvents =
  docSearchReact.useDocSearchKeyboardEvents ||
  (docSearchReact as any).default.useDocSearchKeyboardEvents;

export function SearchIcon(props: any) {
  return (
    <svg width="24" height="24" fill="none" {...props}>
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useSearchProps() {
  let [isOpen, setIsOpen] = useState(false);
  let searchButtonRef = useRef<HTMLButtonElement>(null);
  let [initialQuery, setInitialQuery] = useState('');

  return {
    buttonProps: {
      ref: searchButtonRef,
      onClick() {
        setIsOpen(true);
      },
    },
    dialogProps: {
      isOpen,
      searchButtonRef,
      setIsOpen(open: boolean) {
        setIsOpen(open);
      },
      initialQuery,
      setInitialQuery(query: string) {
        setInitialQuery(query);
      },
    },
  };
}

function SearchDialog({
  isOpen,
  setIsOpen,
  initialQuery,
  setInitialQuery,
  searchButtonRef,
  keyboardEvents,
}: any) {
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (e: any) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery],
  );

  if (keyboardEvents) {
    useDocSearchKeyboardEvents({
      isOpen,
      onOpen,
      onClose,
      onInput,
      searchButtonRef,
    });
  }

  return (
    <>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName={ALGOLIA.indexName}
            appId={ALGOLIA.appId}
            apiKey={ALGOLIA.apiKey}
            transformItems={(items) => {
              return items.map((item) => {
                // We transform the absolute URL into a relative URL to
                // work better on localhost, preview URLS.
                const a = document.createElement('a');
                a.href = item.url;
                const hash = a.hash === '#overview' ? '' : a.hash;
                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                };
              });
            }}
          />,
          document.body,
        )}
    </>
  );
}

export function Search() {
  let { buttonProps, dialogProps } = useSearchProps();
  let [modifierKey, setModifierKey] = useState<string>('⌘');
  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
    );
  }, []);

  return (
    <>
      <button
        type="button"
        className="dark:highlight-white/5 hidden w-60 items-center gap-2 rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-gray-400 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex"
        {...buttonProps}
      >
        <SearchIcon />
        <span>Search docs...</span>

        <span className="ml-auto">{modifierKey}K</span>
      </button>

      <SearchDialog {...dialogProps} keyboardEvents={true} />
    </>
  );
}

export function MobileSearch() {
  let { buttonProps, dialogProps } = useSearchProps();
  return (
    <div className="block md:hidden">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md"
        aria-label="Search docs..."
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      <SearchDialog {...dialogProps} keyboardEvents={false} />
    </div>
  );
}
