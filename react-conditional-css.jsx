import React,{useEffect} from 'react';
import Sheet from 'react-modal-sheet';

function Example() {
  const [isOpen, setOpen] = React.useState(false);
  const [matchs, setMatchs] = React.useState(window.matchMedia("(min-width: 768px)").matches)
  useEffect(() => {
    const handler = (e) => setMatchs( e.matches );
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }, []);

  return (
    <>
    {matchs && (<h1>Big Screen</h1>)}
      {!matchs && (<h3>Small Screen</h3>)}
      <button onClick={() => setOpen(true)}>Open sheet</button>
      
     {/* <div style={{window.innerWidth > 768 ? '800px' : '400px'}}/> */}

      <Sheet isOpen={isOpen} 
      snapPoints={[500, 550, 0, 0]}
      initialSnap={1}
      onClose={() => setOpen(false)}
      >
        <Sheet.Container style={{width:'50%',left:'25%'}}>
      
          <Sheet.Header />
          <Sheet.Content><h1>Arif</h1>
          <button onClick={() => setOpen(false)}>close sheet</button>

          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}

export default Example
