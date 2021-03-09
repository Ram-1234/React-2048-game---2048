import React ,{useEffect,useState} from "react";

export default function Board({GridSize})
{
	let initGrid=[...Array(GridSize)].map(()=>[...Array(GridSize).fill(0)]);

	initGrid[2][0]=2;
	initGrid[2][2]=4;

	const [grid ,setGrid]=useState([...initGrid]);
  const [gameOver, setGameOver]=useState(false);
  const [score,setScore]=useState(0);

  // const shift =(row)=>{
  //   const arr=row.filter(val=>val);

  //   const zeroCount=row.length-arr.length;
  //   const zeros =[...Array(zeroCount)];
  //   arr=arr.append(zeros);
  //   return arr;
  // }

  	const addNewNumber=(gridCopy )=>{
	            let freeSpaces=[];

              	for(let i=0;i<GridSize;i++){
 	                  for(let j=0;j<GridSize;j++){
                        	if(grid[i][j]===0)
	                        {
	                          freeSpaces.push({row: i, col: j});
	                        }
	                  }
 	              }
                 //console.log(freeSpaces);

                 if(freeSpaces.length===0){
                   setGameOver(true);
                 }

            let position =Math.floor(Math.random()*freeSpaces.length);
            gridCopy[freeSpaces[position].row][freeSpaces[position].col]=
            Math.random()>0.5?2:4;
            setGrid(gridCopy);
      };


      const bottomShift=()=>{
        let gridCopy=transpose(grid);
      
        gridCopy=gridCopy.map((row)=>{
          let rowCopy=[...row];
          rowCopy=shiftAll('right',[...rowCopy]);
          mergeLeft(rowCopy);
          rowCopy=shiftAll('right',[...rowCopy]);
          return rowCopy;
        });
        addNewNumber(transpose(gridCopy));
      };
      
      
          const rightShift=()=>{
            let gridCopy= [...grid];
            //console.table(gridCopy);
            gridCopy=gridCopy.map((row)=>{
              let rowCopy=[...row];
              rowCopy=shiftAll('right',[...rowCopy]);
              mergeRight(rowCopy);
              rowCopy=shiftAll('right',[...rowCopy]);
              return rowCopy;
            });
      
            addNewNumber(gridCopy);
            //shift
      
            //merge
          };


          const leftShift=()=>{
            let gridCopy=[...grid];
          
            gridCopy=gridCopy.map((row)=>{
              let rowCopy=[...row];
              rowCopy=shiftAll('left',[...rowCopy]);
              mergeLeft(rowCopy);
              rowCopy=shiftAll('left',[...rowCopy]);
              return rowCopy;
            });
            addNewNumber(gridCopy);
          }

          const topShift=()=>{
            let gridCopy=transpose(grid);
    
            gridCopy=gridCopy.map((row)=>{
              let rowCopy=[...row];
              rowCopy=shiftAll('left',[...rowCopy]);
              mergeLeft(rowCopy);
              rowCopy=shiftAll('left',[...rowCopy]);
              return rowCopy;
            });
            addNewNumber(transpose(gridCopy));
          };


          const shiftAll=(direction,row)=>{
            let arr=row.filter((val)=>val);
              //[0 2 0 4 5]
              //[2 4 5]
            //console.log(arr);
            let missing =GridSize-arr.length;
            let zeros=Array(missing).fill(0);
            //[0 0]
            switch(direction){
              case 'right':
                arr=zeros.concat(arr);
                return arr;
          
              case 'left':
                arr=arr.concat(zeros);
                return arr;
            }
          };

         
          const mergeRight=(row)=>{
            let netScoreAdd=0;
            for(let i=GridSize;i>0;i--){
              let a=row[i];
              let b=row[i-1];
              if(a===b){
                row[i]=a+b;
                netScoreAdd+=row[i];
                row[i-1]=0;
              }
            }
            setScore(score+netScoreAdd);
          };
          
          const mergeLeft=(row)=>{
            let netScoreAdd=0;
            for(let i=0;i<GridSize;i++){
              let a=row[i];
              let b=row[i+1];
              if(a===b){
                row[i]=a+b;
                netScoreAdd+=row[i];
                row[i+1]=0;
              }
            }
            setScore(score+netScoreAdd);
          };
      
             const merge=(row)=>{
               //[0 2 2 0 8]
               //[0 0 4 0 8]
      
               //[0 2 0 2 2]
               //[0 2 0 0 4]
                   for(let i=GridSize-1;i>0;i--){
                         let a=row[i];
                         let b=row[i-1];
                          if(a!=b && a===b){
                          row[i]=a+b;
                          row[i-1]=0;
                          }
                    }
               };
              

 const transpose =(array)=>{
  return array.map((_,colIndex)=>array.map((row)=>row[colIndex]));
   };

  const handleKeydownEvent=(event)=>{
    event.preventDefault();
    const {code}=event;
    switch(code){
      case 'ArrowUp':
        topShift();
        break;
      case 'ArrowDown':
        bottomShift();
        break;
      case 'ArrowLeft':
        leftShift();
        break;
      case 'Arrowright':
        rightShift();
        break;
      default:
        break;
    }
  };


	useEffect(()=>
	{
	window.addEventListener('keydown', handleKeydownEvent,false);
  return ()=>{
    window.removeEventListener('keydown',handleKeydownEvent,false);
  };
	},[grid]);


	return (
      <div className='mt-5'>
        <h2 className='m-5 text-center'>Score:-{score}</h2>
        <div className='board'>
          {grid.map((row,rowIndex)=>{
            return (
            <div className='board-row' key={rowIndex}>
              {row.map((val,index)=>{
                return (
                <div 
                className={`board-box ${val && 'board-box-high'}`}
                key={index}
                >
                  {val != 0 && val}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  </div>
  );       
}


