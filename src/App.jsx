// src/App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Count: {count}</h1>
      </motion.div>

      <Button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</Button>
      <Button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</Button>
    </div>
  );
}

export default App;
