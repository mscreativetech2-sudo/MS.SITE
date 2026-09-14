//* Forms Validation + Formspree Submission */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       CONTACT FORM - تواصل معنا
       ========================================================= */

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            let isValid = true;

            const name = document.getElementById('contact-name');
            const email = document.getElementById('contact-email');
            const subject = document.getElementById('contact-subject');
            const message = document.getElementById('contact-message');
            const successMessage = document.getElementById('contact-success');
            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => {
                el.style.display = 'none';
            });

            if (successMessage) {
                successMessage.style.display = 'none';
            }

            // Validation - Name
            if (!name.value.trim()) {
                document.getElementById('err-contact-name').style.display = 'block';
                isValid = false;
            }

            // Validation - Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                document.getElementById('err-contact-email').style.display = 'block';
                isValid = false;
            }

            // Validation - Subject
            if (!subject.value.trim()) {
                document.getElementById('err-contact-subject').style.display = 'block';
                isValid = false;
            }

            // Validation - Message
            if (!message.value.trim()) {
                document.getElementById('err-contact-message').style.display = 'block';
                isValid = false;
            }

            // Stop if validation fails
            if (!isValid) {
                return;
            }

            // Disable button while sending
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.textContent = 'جاري الإرسال...';
            }

            try {

                const formData = new FormData(contactForm);

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {

                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }

                    contactForm.reset();

                } else {

                    let errorMessage =
                        'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.';

                    try {

                        const data = await response.json();

                        if (data && data.errors && data.errors.length > 0) {
                            errorMessage = data.errors
                                .map(error => error.message)
                                .join(' ');
                        }

                    } catch (error) {
                        // Ignore JSON parsing error
                    }

                    alert(errorMessage);
                }

            } catch (error) {

                console.error('Contact Form Error:', error);

                alert(
                    'تعذر الاتصال بالخادم. تأكد من اتصال الإنترنت ثم حاول مرة أخرى.'
                );
            }

            finally {

                if (submitButton) {
                    submitButton.disabled = false;

                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        'إرسال الرسالة';
                }
            }
        });
    }


    /* =========================================================
       PROJECT FORM - ابدأ مشروعك
       ========================================================= */

    const projectForm = document.getElementById('project-form');

    if (projectForm) {

        const deliveryDate = document.getElementById('proj-date');

        /*
         * عند اختيار التاريخ:
         * نضيف class لإظهار التاريخ في الحقل.
         */
        if (deliveryDate) {

            deliveryDate.addEventListener('change', function () {

                if (this.value) {
                    this.classList.add('has-date');
                } else {
                    this.classList.remove('has-date');
                }

            });
        }


        projectForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            let isValid = true;

            const name = document.getElementById('proj-name');
            const email = document.getElementById('proj-email');
            const phone = document.getElementById('proj-phone');
            const type = document.getElementById('proj-type');
            const desc = document.getElementById('proj-desc');
            const successMessage = document.getElementById('project-success');
            const submitButton = projectForm.querySelector('button[type="submit"]');

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => {
                el.style.display = 'none';
            });

            if (successMessage) {
                successMessage.style.display = 'none';
            }

            // Validation - Name
            if (!name.value.trim()) {
                document.getElementById('err-proj-name').style.display = 'block';
                isValid = false;
            }

            // Validation - Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                document.getElementById('err-proj-email').style.display = 'block';
                isValid = false;
            }

            // Validation - Phone
            if (!phone.value.trim()) {
                document.getElementById('err-proj-phone').style.display = 'block';
                isValid = false;
            }

            // Validation - Project Type
            if (!type.value) {
                document.getElementById('err-proj-type').style.display = 'block';
                isValid = false;
            }

            // Validation - Description
            if (!desc.value.trim()) {
                document.getElementById('err-proj-desc').style.display = 'block';
                isValid = false;
            }

            // Stop if validation fails
            if (!isValid) {
                return;
            }

            // Disable button while sending
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.textContent = 'جاري الإرسال...';
            }

            try {

                const formData = new FormData(projectForm);


                /* =====================================================
                   معالجة تاريخ التسليم
                   ===================================================== */

                if (deliveryDate && deliveryDate.value) {

                    const parts = deliveryDate.value.split('-');

                    const year = parts[0];
                    const month = parts[1];
                    const day = parts[2];

                    /*
                     * تثبيت اتجاه التاريخ من اليسار إلى اليمين.
                     * النتيجة المرسلة:
                     * يوم / شهر / سنة
                     */

                    const formattedDate =
    '\u2066' +
    day +
    '/' +
    month +
    '/' +
    year +
    '\u2069';
                    /*
                     * نستبدل قيمة التاريخ الأصلية
                     * قبل إرسال Formspree.
                     */
                    formData.set('delivery_date', formattedDate);
                }


                const response = await fetch(projectForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });


                if (response.ok) {

                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }

                    projectForm.reset();

                    /*
                     * بعد الإرسال:
                     * نعيد حالة التاريخ إلى فارغ.
                     */
                    if (deliveryDate) {
                        deliveryDate.classList.remove('has-date');
                    }

                } else {

                    let errorMessage =
                        'حدث خطأ أثناء إرسال طلب المشروع. يرجى المحاولة مرة أخرى.';

                    try {

                        const data = await response.json();

                        if (data && data.errors && data.errors.length > 0) {

                            errorMessage = data.errors
                                .map(error => error.message)
                                .join(' ');
                        }

                    } catch (error) {
                        // Ignore JSON parsing error
                    }

                    alert(errorMessage);
                }

            } catch (error) {

                console.error('Project Form Error:', error);

                alert(
                    'تعذر الاتصال بالخادم. تأكد من اتصال الإنترنت ثم حاول مرة أخرى.'
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        'إرسال طلب مشروعك';
                }
            }

        });
    }

});