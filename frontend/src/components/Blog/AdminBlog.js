import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import api from "../../config";

const BlogList = ({ blogs, onDelete, onModify }) => {
  return (
    <ListGroup className="mt-4 bg-transparent border-0">
      {blogs.map((blog) => (
        <ListGroup.Item
          key={blog._id}
          className="d-flex justify-content-between align-items-center bg-slate-900 border border-slate-800 text-slate-200 mb-3 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition-all"
        >
          <div className="flex flex-col space-y-1">
            <span className="font-bold text-white text-base">{blog.title}</span>
            <span className="text-xs text-slate-400">By {blog.author || "Unknown"}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline-info"
              size="sm"
              className="px-3 py-1.5 rounded-xl border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all font-semibold"
              onClick={() => onModify(blog)}
            >
              Modify
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className="px-3 py-1.5 rounded-xl border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all font-semibold"
              onClick={() => onDelete(blog._id)}
            >
              Delete
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

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBlog(null);
    setFormData({ title: "", content: "", author: "", imageUrl: "" });
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${api}/blogs`);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      fetchBlogs();
      setFormData({ title: "", content: "", author: "", imageUrl: "" });
    } catch (error) {
      console.error("Error creating blog post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`${api}/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        console.error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleModify = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      author: blog.author || "",
      imageUrl: blog.imageUrl || blog.image || "",
    });
    setShowModal(true);
  };

  const handleUpdateBlog = async () => {
    if (!selectedBlog?._id) return;
    setIsSubmitting(true);

    try {
      const updateResponse = await fetch(`${api}/blogs/${selectedBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (updateResponse.ok) {
        fetchBlogs();
        handleModalClose();
      } else {
        console.error("Failed to update blog post");
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24 relative">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-4 py-1.5 rounded-full inline-block shadow-lg">
            Content Management
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Admin Blog Panel
          </h2>
          <p className="text-slate-400 text-sm">Create, modify, or delete platform articles live.</p>
        </div>

        {/* Main Creation Card Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3">Create New Article</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="title">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Article Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter engaging title..."
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none placeholder:text-slate-600"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="content">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Article Content</Form.Label>
              <div className="bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                  className="text-slate-100"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="author">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Author Name</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Leevy Otieno"
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none placeholder:text-slate-600"
                required
              />
            </Form.Group>

            <Form.Group className="mb-6" controlId="imageUrl">
              <Form.Label className="text-slate-300 font-semibold text-sm mb-2">Featured Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="bg-slate-950 border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:bg-slate-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-none placeholder:text-slate-600"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 border-0 transition-all duration-300"
            >
              {isSubmitting ? "PUBLISHING..." : "CREATE BLOG POST"}
            </Button>
          </Form>
        </div>

        {/* Existing Articles Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">Existing Published Articles</h3>
          {blogs.length === 0 ? (
            <p className="text-slate-500 text-sm italic">No blog posts found in database.</p>
          ) : (
            <BlogList
              blogs={blogs}
              onDelete={handleDelete}
              onModify={handleModify}
            />
          )}
        </div>

        {/* Modify Modal */}
        <Modal 
          show={showModal} 
          onHide={handleModalClose} 
          centered
          contentClassName="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-2"
        >
          <Modal.Header closeButton className="border-slate-800 text-white">
            <Modal.Title className="font-bold text-cyan-400">Modify Article</Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            <Form>
              <Form.Group className="mb-3" controlId="modal-title">
                <Form.Label className="text-slate-300 text-sm font-semibold">Title</Form.Label>
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
                <Form.Label className="text-slate-300 text-sm font-semibold">Content</Form.Label>
                <div className="bg-slate-950 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
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
                disabled={isSubmitting}
                onClick={handleUpdateBlog}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold border-0 shadow-lg shadow-blue-600/20"
              >
                {isSubmitting ? "SAVING..." : "UPDATE BLOG POST"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </Container>
    </div>
  );
};

export default AdminBlog;