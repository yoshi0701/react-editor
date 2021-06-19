import {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor'

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false)

  // check whether click inside or outside of editor area
  // via listening event switching preview mode or editing mode
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(ref.current && event.target && ref.current.contains(event.target as Node)) {
        // if event is inside of editor just return
        return;
      }
      // outside of editor setEditing is false
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true})

    return () => {
      document.removeEventListener('click', listener, { capture: true})
    };
  }, [])

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    )
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown  source={'# Header'}/>
    </div>
  )
}

export default TextEditor;
