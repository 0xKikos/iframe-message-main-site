import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "@/components/Layout/AppLayout";
import Dao from "@/page/dao";
import Message from "@/page/message";
import Me from "@/page/me";
import Square from "@/page/square";
import Publish from "@/page/square/publish";
import SquareDetail from "./page/square/detail";
import Layout from "./components/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Square />} />
            <Route path="/dao" element={<Dao />} />
            <Route path="/message" element={<Message />} />
            <Route path="/profile" element={<Me />} />
          </Route>
          <Route path="/square/:id" element={<SquareDetail />} />
          <Route path="/publish" element={<Publish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

