import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions';
import { deletePost as deletePostApi, createPost as createPostApi } from '../api';

const PostList = ({ posts, loading, error, fetchPosts, deletePost }) => {
  const [newPost, setNewPost] = useState({ name: '', description: '' });
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId) => {
    try {
      await deletePostApi(postId);
      deletePost(postId);
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      if (!validateForm()) {
        return;
      }
  
      await createPostApi(newPost);

      fetchPosts();
      setNewPost({ name: '', description: '' });
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setNameFilter(value);
    const filtered = posts.filter((post) =>
      post.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const validateForm = () => {
    let isValid = true;

    if (!newPost.name.trim()) {
      setNameError('El nombre es obligatorio');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!newPost.description.trim()) {
      setDescriptionError('La descripción es obligatoria');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const postsToDisplay = nameFilter === '' ? posts : filteredPosts;

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>

      <div>
        <label>
          Filtrar por Nombre:
          <input
            type="text"
            value={nameFilter}
            onChange={handleSearch}
          />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {postsToDisplay.map((post) => (
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>
                <button onClick={() => handleDelete(post.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <form>
          <label>
            <input
              type="text"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              placeholder='Nombre'
            />
             <span style={{ color: 'red' }}>{nameError}</span>
          </label>
          <label>
            <textarea
              value={newPost.description}   
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              placeholder='Descripción'
            />
            <span style={{ color: 'red' }}>{descriptionError}</span>
          </label>
          <button type="button" onClick={handleCreatePost}>
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  loading: state.loading,
  error: state.error,
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostList);
