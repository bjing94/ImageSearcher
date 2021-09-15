import React from 'react'
import './superImage.scss';

interface SuperImageProps{
    src:string;
}
export default function SuperImage(props:SuperImageProps) {
    const { src } = props;
    return (
      <div className="super-img">
        <img className="rounded" src={src} />
      </div>
    );
}
