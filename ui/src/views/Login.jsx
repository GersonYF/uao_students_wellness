import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_fetchUserData, API_loginUser } from '../api';
import { useUserContext } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, user } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await API_loginUser(email, password);
      const userData = await API_fetchUserData(token);
      loginUser({ token, ...userData });
      console.log('Login successful:', { token, ...userData });
      navigate('/dashboard'); // redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    console.log('Updated user:', user);
  }, [user]);

  return (
    <section class="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                      <img src={process.env.PUBLIC_URL + 'wellness.png'}
                        style={{width: "185px"}} alt="logo" />
                      <h4 class="mt-1 mb-5 pb-1">Wellness & Health</h4>
                    </div>

                    <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                      <p>Ingresa a tu cuenta</p>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label class="form-label" for="form2Example11">Correo</label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example28"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label class="form-label" for="form2Example28">Contrase&ntilde;a</label>
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                          Inicio de Sesi&oacute;n
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Ingenier&iacute;a de Datos e IA</h4>
                    <p class="small mb-5">Wellness & Health es una plataforma que se encarga de leer y analizar datos encontrados en el dataset:.</p>
                    <p class="small mb-0">
                      <a href="https://www.kaggle.com/datasets/thedevastator/school-student-health-and-wellbeing" class="btn btn-outline-info">
                        School Student Health and Wellbeing
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
