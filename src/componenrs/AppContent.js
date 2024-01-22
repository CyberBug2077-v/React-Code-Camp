import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => {
    const deadlineA = a.deadline
      ? new Date(a.deadline)
      : new Date('9999-12-31');
    const deadlineB = b.deadline
      ? new Date(b.deadline)
      : new Date('9999-12-31');
    return deadlineA - deadlineB;
  });

  const filteredTodoList = sortedTodoList.filter((item) => {
    switch (filterStatus) {
      case 'all':
        return true;
      case 'incomplete':
        return item.status === 'incomplete';
      case 'complete':
        return item.status === 'complete';
      case 'important':
        return item.isImportant;
      default:
        return true;
    }
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <motion.div key={todo.id} variants={child}>
              <TodoItem key={todo.id} todo={todo} />
            </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
