import { WalletButton } from '../solana/solana-provider';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { AccountChecker } from '../../pages/account/account-ui';
import {
  ClusterChecker,
  ClusterUiSelect,
  ExplorerLink,
} from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';
import AxonImage from '../../../assets/Axon.jpg'; 


export function UiLayout({
  children,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {

  return (
    <div data-theme="winter" className="flex flex-col absolute top-0 h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="navbar rounded-b-[36px] py-3 px-4 bg-base-100 bg-opacity-60 glass shadow-md fixed top-0 w-full z-50 backdrop-blur-sm mb-5 animate-fade-down animate-ease-in-out animate-alternate">
        <div className="flex-1 flex justify-start items-center">
          <a className="btn btn-circle text-5xl font-extrabold w-40" href='/marketplace'>
            <img src={AxonImage} alt="Axon" style={{ width: '130px', height: 'auto' }} className=' whitespace-nowrap fixed' />
          </a>
        </div>
        <div className='flex-1 flex justify-center '>
          <Link to="/createVault" className=" btn w-60 btn-m text-lg shadow-md rounded-2xl">
            Create Vault
          </Link>
        </div>
        <div className='flex-1 flex justify-end'>
          <div className="flex space-x-2 px-4 justify-end">
            <ClusterUiSelect />
            <WalletButton />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between" onClick={() => window.location.href = '/profile'}>
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      <div className="flex-grow mx-4 lg:mx-auto mt-20 z-49 animate-fade-down animate-ease-in-out animate-alternate">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-2 bg-base-200 text-base-content bg-transparent">
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>


  );
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button
                className="btn btn-xs lg:btn-md btn-primary"
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? (
            <h1 className="text-5xl font-bold">{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className="py-6">{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className="btn btn-xs btn-primary"
        />
      </div>
    );
  };
}
