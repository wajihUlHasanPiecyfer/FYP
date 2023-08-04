import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-12">
          <div className="section-title text-center pb-30">
            <h3 className="title">Contact US</h3>
            <p className="text">
            For any inquiries or assistance, please feel free to contact us.

            </p>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="contact-map">
          <iframe
          title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.373812365464!2d74.34457447415707!3d31.513891547464695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190450cf506e8f%3A0x96079a0458c149c4!2sSir%20Syed%20College%20Of%20Computer%20Science!5e0!3m2!1sen!2s!4v1690396361767!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-12 col-md-6">
            <div className="col-12">
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>Address</dt>
                        38-47/C2-Gulberg III, Ghalib Road, Lahore, Pakistan
                    </address>
                </div>
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>Phone</dt>
                        (042) 3578 5580
                    </address>
                </div>
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>Mobile</dt>
                        0302 4423272
                    </address>
                </div>
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>WhatsApp</dt>
                        0302 4423272
                    </address>
                </div>
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>Website</dt>
                         www.scocs.edu.pk
                    </address>
                </div>
                <div className="single-contact-info contact-color-1 mt-20 d-flex ">
                    <address className="pl-2">
                        <dt>Emial</dt>
                        info@scocs.edu.pk
                    </address>
                </div>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default ContactUs;
