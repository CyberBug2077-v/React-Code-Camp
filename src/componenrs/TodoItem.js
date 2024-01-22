import { differenceInCalendarDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import {
  MdDelete,
  MdEdit,
  MdStar,
  MdStarBorder,
  MdWarning,
  MdPlayArrow,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
import TimerModal from './TimerModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  const handleImportant = () => {
    dispatch(updateTodo({ ...todo, isImportant: !todo.isImportant }));
  };

  const handleStartTimer = () => {
    setShowTimerModal(true);
  };

  const handleCloseTimer = () => {
    setShowTimerModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const calculateRemainingDays = (deadline) => {
    const today = new Date();
    const endDate = new Date(deadline);
    return differenceInCalendarDays(endDate, today);
  };

  const daysLeft = calculateRemainingDays(todo.deadline);
  const isNearDeadline = daysLeft <= 3;

  return (
    <>
      <motion.div
        className={`${styles.item} ${
          isNearDeadline ? styles.nearDeadline : ''
        }`}
        variants={child}
      >
        <div className={styles.todoDetails}>
          {isNearDeadline && <MdWarning />}
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
          {todo.deadline ? (
            <div className={styles.deadline}>
              <p>
                Deadline: {format(new Date(todo.deadline), 'p, MM/dd/yyyy')}
              </p>
              <p>Days Left: {calculateRemainingDays(todo.deadline)}</p>
            </div>
          ) : (
            <p>No Deadline Set</p>
          )}
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleStartTimer}
            onKeyDown={handleStartTimer}
            tabIndex={0}
            role="button"
          >
            <MdPlayArrow />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
          <div
            className={styles.icon}
            onClick={handleImportant}
            onKeyDown={handleImportant}
            tabIndex={0}
            role="button"
          >
            {todo.isImportant ? <MdStar /> : <MdStarBorder />}
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
      {showTimerModal && (
        <TimerModal duration={todo.duration} onClose={handleCloseTimer} />
      )}
    </>
  );
}

export default TodoItem;
