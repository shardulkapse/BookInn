import { Dialog } from "@headlessui/react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignInForm from "./SignInForm";

function AuthModal({ isOpen, setIsOpen, notify }: any) {
  const [activeForm, setActiveForm] = useState(1);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        setActiveForm(1);
      }}
      className="relative z-100"
    >
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-[500px] max-w-sm bg-black border-slate-700 p-10  text-white rounded-xl shadow-card">
          {activeForm === 1 && (
            <LoginForm
              setActiveForm={setActiveForm}
              setIsOpen={setIsOpen}
              notify={notify}
            />
          )}
          {activeForm === 2 && (
            <SignInForm
              setActiveForm={setActiveForm}
              setIsOpen={setIsOpen}
              notify={notify}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default AuthModal;
