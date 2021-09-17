import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import './numberOfPages.scss';
import "./photoPage.scss";

interface NumberOfPagesProps {
  count: number;
  currentPage: number;
  onClickPage: (a: number) => void;
}

export default function NumberOfPages(props: NumberOfPagesProps) {
  const { count, currentPage, onClickPage } = props;
  let usedNumbers: string[] = [];
  let currNum = 1;

  while (currNum <= count && currNum <= 5) {
    usedNumbers.push(`${currNum}`);

    currNum++;
  }
  //check if too many pages between
  if (currentPage - currNum > 3) {
    usedNumbers.push(`...`);
  }
  //check if we are too close to current page
  if(currNum<currentPage-2){
    currNum=currentPage-2;
  }
  while (currNum <= count && currNum <= currentPage + 2) {
    usedNumbers.push(`${currNum}`);
    currNum++;
  }
    //check if too many pages between
  if (count - currNum > 5) {
    usedNumbers.push(`...`);
  }
  if(currNum<count-4){
    currNum=count-4;
   
  }
  while (currNum <= count) {
    usedNumbers.push(`${currNum}`);
    currNum++;
  }
  const elements = usedNumbers.map((str) => {
    if (+str === currentPage) {
      return <div className="number-of-pages-item active" key={`pageNum_${str}`}>{str}</div>;
    }
    if (str === "...") {
      return (
        <div className="number-of-pages-item" key={`pageNum_${str}`}>
          <AiOutlineEllipsis />
        </div>
      );
    }
    return (
      <div
        className="number-of-pages-item"
        onClick={() => {
          onClickPage(+str);
        }}
        key={`pageNum_${str}`}
      >
        {str}
      </div>
    );
  });
  return (
    <div className="number-of-pages-container" >
      {elements}
    </div>
  );
}
