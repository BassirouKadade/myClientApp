import  { useEffect } from 'react';
import './AnimComponent.css';

export default function AnimComponent({ borderColor, bord, padChild, padParent }) {
  useEffect(() => {
    const spanParent = document.getElementsByClassName('anim1')[0];
    spanParent.style.padding = `${padParent}px`;
    spanParent.style.border = `${bord}px solid transparent`;
    spanParent.style.borderRightColor = borderColor;
    spanParent.style.borderTopColor = borderColor;

    const spanEnfant = document.getElementsByClassName('anim2')[0];
    spanEnfant.style.padding = `${padChild}px`;
    spanEnfant.style.border = `${bord}px solid transparent`;
    spanEnfant.style.borderRightColor = borderColor;
    spanEnfant.style.borderTopColor = borderColor;
  }, [borderColor, bord, padChild, padParent]);

  return (
    <span className="anim1">
      <span className="anim2"></span>
    </span>
  );
}
