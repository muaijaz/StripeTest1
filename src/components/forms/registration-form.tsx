"use client";

import { useState } from "react";
import { applyForAccount } from "@/server/actions/submit-application";
import { z } from "zod";

const schema = z.object({
  organizationType: z.enum(["CANDIDATE", "PAC"]),
  organizationName: z.string().min(2),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  office: z.string().optional(),
  state: z.string().min(2),
  district: z.string().optional(),
  committeeId: z.string().optional()
});

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function RegistrationForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [values, setValues] = useState({
    organizationType: "CANDIDATE",
    organizationName: "",
    contactName: "",
    contactEmail: "",
    office: "",
    state: "",
    district: "",
    committeeId: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parseResult = schema.safeParse(values);
    if (!parseResult.success) {
      setFormState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setFormState({ status: "submitting" });
    const result = await applyForAccount(parseResult.data);
    if (result.error) {
      setFormState({ status: "error", message: result.error });
    } else {
      setFormState({ status: "success", message: "Application submitted. We\'ll be in touch soon." });
      setValues({
        organizationType: "CANDIDATE",
        organizationName: "",
        contactName: "",
        contactEmail: "",
        office: "",
        state: "",
        district: "",
        committeeId: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="organizationType">
          Organization type
        </label>
        <select
          id="organizationType"
          name="organizationType"
          value={values.organizationType}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="CANDIDATE">Candidate campaign</option>
          <option value="PAC">Political Action Committee</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="organizationName">
          Organization name
        </label>
        <input
          id="organizationName"
          name="organizationName"
          value={values.organizationName}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contactName">
            Contact name
          </label>
          <input
            id="contactName"
            name="contactName"
            value={values.contactName}
            onChange={handleChange}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contactEmail">
            Contact email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={values.contactEmail}
            onChange={handleChange}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      {values.organizationType === "CANDIDATE" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="office">
              Office
            </label>
            <input
              id="office"
              name="office"
              value={values.office}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              value={values.state}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="district">
              District (optional)
            </label>
            <input
              id="district"
              name="district"
              value={values.district}
              onChange={handleChange}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
      {values.organizationType === "PAC" && (
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="committeeId">
            FEC Committee ID
          </label>
          <input
            id="committeeId"
            name="committeeId"
            value={values.committeeId}
            onChange={handleChange}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
      )}
      {formState.status === "error" && (
        <p className="text-sm text-red-600">{formState.message}</p>
      )}
      {formState.status === "success" && (
        <p className="text-sm text-emerald-600">{formState.message}</p>
      )}
      <button className="btn-primary w-full" type="submit" disabled={formState.status === "submitting"}>
        {formState.status === "submitting" ? "Submitting…" : "Submit application"}
      </button>
      <p className="text-xs text-slate-500">
        After approval you&apos;ll receive a Stripe Connect onboarding link and dashboard access.
      </p>
    </form>
  );
}
