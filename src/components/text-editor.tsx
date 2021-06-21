import {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor'

import './text-editor.css'

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  // state which use input correctly applied to preview mode
  const [value, setValue] = useState('#Header');

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
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown  source={value}/>
      </div>
    </div>
  );
}

export default TextEditor;
