import React from 'react'
import { CircleLoader } from 'react-spinners';
interface LoadingPlateProps{
    size:number;
    color:string;
}
export default function LoadingPlate({size,color}:LoadingPlateProps) {
    return (
      <div className="d-flex  w-100 h-100 flex-column justify-center align-items-center pt-5">
        <React.Fragment>
          <h3 style={{ color: `${color}` }}>Loading! </h3>
          <CircleLoader size={size} color={color} />
        </React.Fragment>
      </div>
    );
}
