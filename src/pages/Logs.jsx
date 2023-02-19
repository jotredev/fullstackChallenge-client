import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosClient from "../configs/axiosClient";
import Loading from "../components/Loading";
import { shortDateAndHour } from "../helpers/datesFormat";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Check if token exists
        const token = localStorage.getItem("tokenFullStackChallenge");

        if (!token) {
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/posts/logs/all", config);
        setLogs(data.logs);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {isAdmin ? (
        <div>
          <div className="flex items-center justify-between gap-8 mb-10">
            <h1 className="text-2xl font-bold">Registros</h1>
            <nav className="mt-1">
              <Link to="/admin/inicio" className="hover:underline">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span className="font-bold">Registros</span>
            </nav>
          </div>
          {logs.length > 0 ? (
            <div className="p-8 bg-gray-900 rounded-xl">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="text-gray-300 flex items-center justify-between p-3 border-b border-dashed border-gray-500/30 last-of-type:border-0"
                >
                  <p>{log.description}</p>
                  <span>{shortDateAndHour(log.createdAt)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <h1 className="text-2xl font-bold">No hay registros</h1>
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/admin/inicio" />
      )}
    </>
  );
}
