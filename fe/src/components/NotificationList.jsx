import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function NotificationList({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:3000/notification`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewPost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:3000/notification/markSeen`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) {
        throw new Error('Failed to mark notification as seen');
      }

      navigate(`/post/${postId}`);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>
      {loading && <p className="text-gray-500">Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div
            key={notification._id}
            className="p-4 mb-6 bg-white rounded-lg shadow-md flex flex-col border border-gray-200"
          >
            <p className="text-gray-700 text-md">{notification.message}</p>
            {notification.fileContent && (
              <pre className="bg-gray-50 p-3 mt-3 rounded-lg border border-gray-200 text-sm text-gray-800 overflow-x-auto">
                {notification.fileContent}
              </pre>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => viewPost(notification.postId)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg shadow transition duration-200"
              >
                View Post
              </button>
            </div>
          </div>
        ))
      ) : (
        !loading && <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
  
}

NotificationList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NotificationList;
