import { useState } from "react";
import * as Notification from "../../../Utils/Notifications.js";
import Page from "../../Common/components/Page";
import { useMessageListener } from "../../../Common/hooks/useMessageListener";
import PatientConsultationNotesList from "../PatientConsultationNotesList.js";
import { PatientNoteStateType, PaitentNotesReplyModel } from "../models.js";
import routes from "../../../Redux/api.js";
import request from "../../../Utils/request/request.js";
import useQuery from "../../../Utils/request/useQuery.js";
import { classNames } from "../../../Utils/utils.js";
import { PATIENT_NOTES_THREADS } from "../../../Common/constants.js";
import useAuthUser from "../../../Common/hooks/useAuthUser.js";
import DoctorNoteReplyPreviewCard from "../DoctorNoteReplyPreviewCard.js";
import RichTextEditor from "../../Common/RichTextEditor/RichTextEditor";
import PatientNotesDetailedView from "../PatientNotesDetailedView.js";
import Tabs from "../../Common/components/Tabs.js";

interface ConsultationDoctorNotesProps {
  patientId: string;
  facilityId: string;
  consultationId: string;
}

const ConsultationDoctorNotes = (props: ConsultationDoctorNotesProps) => {
  const { patientId, facilityId, consultationId } = props;

  const authUser = useAuthUser();
  const [thread, setThread] = useState(
    authUser.user_type === "Nurse"
      ? PATIENT_NOTES_THREADS.Nurses
      : PATIENT_NOTES_THREADS.Doctors,
  );

  const [patientActive, setPatientActive] = useState(true);
  const [noteField, setNoteField] = useState("");
  const [reload, setReload] = useState(false);
  const [facilityName, setFacilityName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reply_to, setReplyTo] = useState<PaitentNotesReplyModel | undefined>(
    undefined,
  );
  const [mode, setMode] = useState<"thread-view" | "default-view">(
    "default-view",
  );
  const [threadViewNote, setThreadViewNote] = useState("");
  console.log("ConsultationDoctorNotes -> threadViewNote", threadViewNote);

  const initialData: PatientNoteStateType = {
    notes: [],
    cPage: 1,
    totalPages: 1,
    facilityId: facilityId,
    patientId: patientId,
  };
  const [state, setState] = useState(initialData);

  const onAddNote = async () => {
    if (!/\S+/.test(noteField)) {
      Notification.Error({
        msg: "Note Should Contain At Least 1 Character",
      });
      return;
    }

    const { res, data } = await request(routes.addPatientNote, {
      pathParams: {
        patientId: patientId,
      },
      body: {
        note: noteField,
        thread,
        consultation: consultationId,
        reply_to: reply_to?.id,
      },
    });

    if (res?.status === 201) {
      Notification.Success({ msg: "Note added successfully" });
      setState({ ...state, cPage: 1 });
      setNoteField("");
      setReload(true);
      setReplyTo(undefined);
    }

    return data?.id;
  };

  useQuery(routes.getPatient, {
    pathParams: { id: patientId },
    onResponse: ({ data }) => {
      if (data) {
        setPatientActive(data.is_active ?? true);
        setPatientName(data.name ?? "");
        setFacilityName(data.facility_object?.name ?? "");
      }
    },
  });

  useMessageListener((data) => {
    const message = data?.message;
    if (
      (message?.from == "patient/doctor_notes/create" ||
        message?.from == "patient/doctor_notes/edit") &&
      message?.facility_id == facilityId &&
      message?.patient_id == patientId
    ) {
      setReload(true);
    }
  });

  return (
    <Page
      title="Discussion Notes"
      className="relative flex h-screen flex-col"
      crumbsReplacements={{
        [facilityId]: { name: facilityName },
        [patientId]: { name: patientName },
      }}
      backUrl={`/facility/${facilityId}/patient/${patientId}`}
    >
      <div className="right-16 top-8 mx-2 md:absolute">
        <Tabs
          className="mt-3 w-full gap-8 lg:w-full"
          tabs={[
            { text: "Thread View", value: "thread-view" },
            { text: "Default View", value: "default-view" },
          ]}
          currentTab={mode}
          onTabChange={(tab) => setMode(tab as "thread-view" | "default-view")}
        />
      </div>
      <div className="relative flex grow flex-col rounded-lg border border-gray-300 bg-white px-2 sm:mx-10 sm:px-5 sm:pt-8 md:mx-3">
        <div className="absolute inset-x-0 top-0 z-10 flex bg-gray-200 text-sm shadow-md">
          {Object.values(PATIENT_NOTES_THREADS).map((current) => (
            <button
              key={current}
              className={classNames(
                "flex flex-1 justify-center border-b-2 py-2",
                thread === current
                  ? "border-primary-500 font-bold text-secondary-800"
                  : "border-secondary-300 text-secondary-800",
              )}
              onClick={() => setThread(current)}
            >
              {
                {
                  10: "Doctor's Discussions",
                  20: "Nurse's Discussions",
                }[current]
              }
            </button>
          ))}
        </div>
        <div className="flex">
          <div className="flex-1">
            <PatientConsultationNotesList
              state={state}
              setState={setState}
              reload={reload}
              setReload={setReload}
              thread={thread}
              setReplyTo={setReplyTo}
              mode={mode}
              setThreadViewNote={setThreadViewNote}
            />

            <DoctorNoteReplyPreviewCard
              parentNote={reply_to}
              cancelReply={() => setReplyTo(undefined)}
            >
              <RichTextEditor
                initialMarkdown={noteField}
                onChange={setNoteField}
                onAddNote={onAddNote}
                isAuthorized={patientActive}
              />
            </DoctorNoteReplyPreviewCard>
          </div>

          {threadViewNote && (
            <PatientNotesDetailedView
              patientId={patientId}
              consultationId={consultationId}
              noteId={threadViewNote}
              thread={thread}
              setThreadViewNote={setThreadViewNote}
            />
          )}
        </div>
      </div>
    </Page>
  );
};

export default ConsultationDoctorNotes;
