import React, { useMemo } from "react";
import { Button } from "../components/ui/button";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import Section from "../components/ui/AnimationSection";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactDetails = useMemo(
    () => [
      {
        label: "Email",
        value: "support@nytbooks.app",
        href: "mailto:support@nytbooks.app",
        Icon: MailOutlineIcon,
      },
      {
        label: "Phone",
        value: "+1 (555) 123-4567",
        href: "tel:+15551234567",
        Icon: PhoneIcon,
      },
      {
        label: "Location",
        value: "Innovation City, USA",
        href: "#",
        Icon: LocationPinIcon,
      },
    ],
    []
  );

  async function onSubmit(values) {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 900));
    // Success: reset form
    reset();
    // Optional: log or send analytics
    console.log(values);
  }

  return (
    <Section>
      <section>
        {/* Hero background */}
        <div className="container mx-auto px-4 pt-16 pb-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold">Contact Us</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Questions, feedback, or partnership ideas? We would love to hear
            from you.
          </p>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 mt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Contact cards */}
            <div className="space-y-4 lg:col-span-1">
              {contactDetails.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="group flex flex-wrap items-start gap-4 rounded-lg border border-border/60 bg-backgrounds/70 p-5 shadow-sm hover:shadow-md transition break-words"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-main/15 text-main">
                    <item.Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-text group-hover:text-main transition">
                      {item.value}
                    </p>
                  </span>
                </a>
              ))}
              <div className="rounded-lg border border-border/60 bg-backgrounds/70 p-5">
                <p className="text-sm text-muted-foreground">
                  Prefer email? Reach us at{" "}
                  <a
                    className="text-main underline break-words"
                    href="mailto:support@nytbooks.app"
                  >
                    support@nytbooks.app
                  </a>
                  . We respond within 1 business day.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-lg border border-border/60 bg-backgrounds/70 p-5 md:p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm text-muted-foreground"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", {
                        required: "Your name is required",
                        validate: (v) =>
                          v.trim().length > 0 || "Your name is required",
                      })}
                      className={`mt-1 w-full rounded-md border bg-background p-2.5 outline-none focus:ring-2 focus:ring-main ${
                        errors.fullName ? "border-red-500" : "border-border/60"
                      }`}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      className={`mt-1 w-full rounded-md border bg-background p-2.5 outline-none focus:ring-2 focus:ring-main ${
                        errors.email ? "border-red-500" : "border-border/60"
                      }`}
                      placeholder="jane@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm text-muted-foreground"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register("subject", {
                        required: "Subject is required",
                        validate: (v) =>
                          v.trim().length > 0 || "Subject is required",
                      })}
                      className={`mt-1 w-full rounded-md border bg-background p-2.5 outline-none focus:ring-2 focus:ring-main ${
                        errors.subject ? "border-red-500" : "border-border/60"
                      }`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm text-muted-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register("message", {
                        required: "Message is required",
                        validate: (v) =>
                          v.trim().length > 0 || "Message is required",
                      })}
                      className={`mt-1 w-full rounded-md border bg-background p-2.5 outline-none focus:ring-2 focus:ring-main ${
                        errors.message ? "border-red-500" : "border-border/60"
                      }`}
                      placeholder="Share details that help us assist you"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                {isSubmitSuccessful && (
                  <div className="mt-4 rounded-md border border-green-500/40 bg-green-500/10 p-3 text-sm text-green-600">
                    Thank you! Your message has been sent. We will get back to
                    you shortly.
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                  <Button
                    type="submit"
                    className="bg-main text-white hover:opacity-90 disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}
