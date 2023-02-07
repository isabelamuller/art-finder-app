import { ReactNode } from "react";

export interface ModalHowToType {
    children?: ReactNode;
    isOpenHowTo: boolean;
    toggleHowTo: () => void;
  }
  
  export interface ModalSettings {
    children?: ReactNode;
    isOpenSettings: boolean;
    toggleSettings: () => void;
  }

export const ModalHowTo = (props: ModalHowToType) => {
    return (
        <>
        {props.isOpenHowTo && (
          <div className="Modal-HowTo-Overlay" onClick={props.toggleHowTo}>
            <div onClick={(e) => e.stopPropagation()} className="Modal-HowTo-Box">
              {props.children} 
            </div>
          </div>
        )}
      </>
    );
  }

export const ModalSettings = (props:ModalSettings) => {
  return (
    <>
    {props.isOpenSettings && (
          <div className="Modal-Settings-Overlay" onClick={props.toggleSettings}>
            <div onClick={(e) => e.stopPropagation()} className="Modal-Settings-Box">
              {props.children} 
            </div>
          </div>
        )}
    </>
  )
}
// notes:
// nao sei pra que cargas d'agua o props.children serve