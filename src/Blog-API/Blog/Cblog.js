import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as Yup from "yup";


const Cblog = () => {

    const [data, setData] = useState([]);
    const [initialValues, setInitialValues] = useState([]);
    const [row, setRow] = useState(null);


    const history = useHistory()
    let usertoken = localStorage.getItem('usertoken')
    let upId = localStorage.getItem('updateId')

    useEffect(() => {

        if (!usertoken) {
            history.push('/user/login')
        }


        if (upId) {
            axios.get('https://blog-api-dzjv.onrender.com/blog/findone/' + upId)
                .then((res) => {
                    console.log("hftre", res.data.data);
                    setInitialValues(res.data.data)
                    setRow(upId)
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                })
        }
    }, [])


    const BlogData = (values) => {

        const form = new FormData();
        form.append('image', values.image);
        form.append('title', values.title);
        form.append('description', values.description);

        if (row == null) {
            axios.post('https://blog-api-dzjv.onrender.com/blog/create', form,
                {
                    headers: {
                        usertoken: usertoken,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('blogid', res.data.data._id)
                    console.log(res.data.data);
                    setInitialValues('')
                    setRow(null)
                    history.push('/')
                })
                .catch((error) => {
                    alert(error.response);
                })
        }
        else {
            console.log("update");
            axios.put('https://blog-api-dzjv.onrender.com/blog/update/' + upId, form,
                {
                    headers: {
                        usertoken: usertoken,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    console.log("fffff",res.data.data);
                    setInitialValues('')
                    setRow(null)
                    history.push('/')
                })
                .catch((error) => {
                    console.log(error.response);
                })
        }

    }

    const Blogschema = Yup.object().shape({
        image: Yup.string().required(),
        title: Yup.string().required(),
        description: Yup.string().required(),

    });


    return (
        <div className='d-flex justify-content-center align-items-center mtb-30 '>
            <div className="box-1">
                <h1>Create Blog </h1>
                <Formik
                    initialValues={{
                        image: '',
                        title: '',
                        description: '',
                        ...initialValues
                    }}
                    enableReinitialize={true}
                    validationSchema={Blogschema}
                    onSubmit={async (values) => {
                        BlogData(values)
                    }}
                >
                    {
                        (props) => (
                            <Form className='d-flex flex-column blog-from'>
                                <label htmlFor="image" className='fw-bold'>image</label>
                                <input type="file" className='in-gov' onChange={(e) => props.setFieldValue("image", e.target.files[0])} />
                                <span><ErrorMessage name='image' /><br></br></span>

                                <label htmlFor="title" className='fw-bold'>title</label>
                                <Field id="title" className='in-gov' name="title" placeholder="title" />
                                <span><ErrorMessage name='title' /><br></br></span>

                                <label htmlFor="description" type="text-box" className='fw-bold'>description</label>
                                <Field id="description" className='in-gov' name="description" placeholder="description" />
                                <span> <ErrorMessage name='description' /><br></br></span>

                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className='button submit'>Submit</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default Cblog