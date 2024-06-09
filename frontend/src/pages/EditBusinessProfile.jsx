import { Container, Image, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import imgdefault from '../assets/default-user.png';

const EditBusinessProfile = () => {

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  console.log(currentUser._id)

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }

  return (
    <Container className="edit-container">
      <h3>Edit Profile</h3>
      <Form className="edit-Form" onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])}
          type="file" ref={fileRef} hidden accept='image/*' />
        <Image onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar}
          roundedCircle
          alt="profile"
          width="200"
          height="200" />
        <p>
          {fileUploadError ?
            (<span>Error Image upload (image must be less than 2 mb)</span>) :
            filePerc > 0 && filePerc < 100 ?
              (<span>{`Uploading ${filePerc}%`}</span>) :
              filePerc === 100 ?
                (<span>Image successfully uploaded!</span>) : ('')
          }
        </p>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="userName" placeholder="Enter user Name" defaultValue={currentUser.username} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" defaultValue={currentUser.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChange} />
        </Form.Group>

        <Button variant="dark" type="submit">
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </Form>

      <div className="edit-link">
        <Button variant="link" onClick={handleDeleteUser}>
          Delete account
        </Button>
        <Button variant="link" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
      <p>{error ? error : ''}</p>
      <p>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </Container>
  )
}

export default EditBusinessProfile;