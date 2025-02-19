import { Bell } from "lucide-react";
import { motion } from 'framer-motion';

const NotificationCard = ({ onDismiss,onAllow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white shadow-lg border p-4 w-fit max-sm:w-fit mx-4 text-center flex flex-col items-end justify-between min-h-[10rem] "
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-center items-center bg-blue-800 p-2 rounded-full">
          <Bell className="w-9 h-9 text-white fill-current" />
        </div>
        <div className="flex flex-col justify-start items-start ">
          <p className="text-green-600 font-semibold min-w-max max-sm:min-w-fit">
            Click to allow notification subscription
          </p>
          <p className="text-slate-600 text-sm min-w-max max-sm:min-w-fit">
            Stay updated with the latest happenings on our site.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={onAllow}
        >
          Allow
        </button>
        <button
          className="bg-slate-400 text-slate-600 px-4 py-2 rounded-lg"
          onClick={onDismiss}
        >
          Later
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
