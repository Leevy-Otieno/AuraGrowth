import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import api from "../../config";

const BlogTitleList = ({ blogTitles, onDelete, onModify }) => {
  return (
    <ListGroup className="mt-4 bg-transparent border-0">
      {blogTitles.map((title, index) => (
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center bg-slate-900 border border-slate-800 text-slate-200 mb-3 rounded-xl p-4 shadow-md"
        >
          <span className="font-semibold">{title}</span>
          <div className="flex gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              className="px-3 rounded-lg border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              onClick={() => onDelete(index)}
            >
              Delete
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              className="px-3 rounded-lg border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all font-semibold"
              onClick={() => onModify(index)}
            >
              Modify
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const [blogTitles, setBlogTitles] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBlogTitles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchBlogTitles();
      setFormData({ title: "", content: "", author: "", imageUrl: "" });
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const fetchBlogTitles = async () => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      setBlogTitles(data.map((blog) => blog.title));
    } catch (error) {
      console.error("Error fetching blog titles:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blogIdToDelete = data.find(
        (blog) => blog.title === blogTitles[index]
      );

      await fetch(`${api}/blogs/${blogIdToDelete._id}`, {
        method: "DELETE",
      });

      fetchBlogTitles();
    } catch (error) {
      console.error(`Error deleting blog at index ${index}:`, error);
    }
  };

  const handleModify = async (index) => {
    try {
      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blogToModify = data.find(
        (blog) => blog.title === blogTitles[index]
      );

      setSelectedBlog(blogToModify);
      setFormData({
        title: blogToModify.title,
        content: blogToModify.content,
        author: blogToModify.author,
        imageUrl: blogToModify.imageUrl,
      });
      setShowModal(true);
    } catch (error) {
      console.error(`Error modifying blog at index ${index}:`, error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const sanitizedContent = formData.content.replace(/<\/?p>/g, "");

      const updatedBlogData = {
        title: formData.title,
        content: sanitizedContent,
        author: formData.author,
        imageUrl: formData.imageUrl,
      };

      const response = await fetch(`${api}/blogs`);
      const data = await response.json();
      const blogToUpdate = data.find((blog) => blog.title === selectedBlog.title);

      const updateResponse = await fetch(
        `${api}/blogs/${blogToUpdate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBlogData),
        }
      );

      if (updateResponse.ok) {
        console.log("Blog updated successfully");
        fetchBlogTitles();
        setShowModal(false);
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24 relative">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-4 py-1.5 rounded-full inline-block">
            Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Admin Blog Panel
          </h2>
        </div>

        {/* Main Creation Card Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="title">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Blog Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter engaging blog title..."
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="content">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Blog Content</Form.Label>
              <div className="bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  className="text-slate-100"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="author">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name..."
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none"
                required
              />
            </Form.Group>

            <Form.Group className="mb-6" controlId="imageUrl">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 border-0 transition-all duration-300"
            >
              CREATE BLOG POST
            </Button>
          </Form>
        </div>

        {/* Blog Titles List Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Existing Blog Posts</h3>
          <BlogTitleList
            blogTitles={blogTitles}
            onDelete={handleDelete}
            onModify={handleModify}
          />
        </div>

        {/* Update Blog Modal styled to match theme */}
        <Modal 
          show={showModal} 
          onHide={handleModalClose} 
          centered
          contentClassName="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-4"
        >
          <Modal.Header closeButton className="border-slate-800 text-white">
            <Modal.Title className="font-bold text-cyan-400">Modify Blog Post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form>
              <Form.Group className="mb-3" controlId="modal-title">
                <Form.Label className="text-slate-300 text-sm font-semibold">Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="modal-content">
                <Form.Label className="text-slate-300 text-sm font-semibold">Blog Content</Form.Label>
                <div className="bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
                  <ReactQuill
                    theme="snow"
                    value={formData.content || ""}
                    onChange={(value) =>
                      setFormData({ ...formData, content: value })
                    }
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="modal-author">
                <Form.Label className="text-slate-300 text-sm font-semibold">Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="modal-imageUrl">
                <Form.Label className="text-slate-300 text-sm font-semibold">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-2"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleUpdateBlog}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold border-0 shadow-lg shadow-blue-600/20"
              >
                Update Blog
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </Container>
    </div>
  );
};

export default AdminBlog;