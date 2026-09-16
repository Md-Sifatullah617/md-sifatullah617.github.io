import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

// SplitForms (splitforms.com) — a static-site form backend, same category as
// Formspree/Web3Forms: the access key identifies which form submissions route
// to, not an account secret, so it's fine baked into the client bundle. Set via
// REACT_APP_SPLITFORMS_ACCESS_KEY at build time (see .github/workflows/deploy.yml).
const SPLITFORMS_ACCESS_KEY = process.env.REACT_APP_SPLITFORMS_ACCESS_KEY;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useRef();

  const sendEmail = async (e: any) => {
    e.preventDefault();

    const hasNameError = name === '';
    const hasEmailError = email === '';
    const hasMessageError = message === '';
    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);
    if (hasNameError || hasEmailError || hasMessageError) return;

    if (!SPLITFORMS_ACCESS_KEY) {
      setSubmitState('error');
      setErrorMessage('Contact form is not configured yet — email me directly instead.');
      return;
    }

    setSubmitState('submitting');
    try {
      const res = await fetch('https://splitforms.com/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: SPLITFORMS_ACCESS_KEY,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitState('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitState('error');
        setErrorMessage(data.message || 'Something went wrong — please try again.');
      }
    } catch (error) {
      setSubmitState('error');
      setErrorMessage('Network error — please try again or email me directly.');
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact</h1>
          <p>Open to advising, hard backend and mobile problems, and Manobsheba partnerships.</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
              />
              <TextField
                required
                id="outlined-required"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendEmail}
              disabled={submitState === 'submitting'}
            >
              {submitState === 'submitting' ? 'Sending…' : 'Send'}
            </Button>
            {submitState === 'success' && (
              <Alert severity="success" sx={{ marginTop: '1rem' }}>
                Message sent — I'll get back to you soon.
              </Alert>
            )}
            {submitState === 'error' && (
              <Alert severity="error" sx={{ marginTop: '1rem' }}>
                {errorMessage}
              </Alert>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
