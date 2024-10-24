import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RESULTS_PER_PAGE_LIMIT } from "@/common/constants";
import CircularProgress from "@/components/Common/components/CircularProgress";
import routes from "../../Redux/api";
import { PatientNoteStateType, PatientNotesModel } from "./models";
import useSlug from "@/common/hooks/useSlug";
import DoctorNote from "./DoctorNote";
import request from "../../Utils/request/request";

interface PatientNotesProps {
  state: PatientNoteStateType;
  setState: Dispatch<SetStateAction<PatientNoteStateType>>;
  reload?: boolean;
  setReload?: (value: boolean) => void;
  disableEdit?: boolean;
  thread: PatientNotesModel["thread"];
  setReplyTo?: (value: PatientNotesModel | undefined) => void;
  mode?: "thread-view" | "default-view";
  setThreadViewNote?: (noteId: string) => void;
}

const pageSize = RESULTS_PER_PAGE_LIMIT;

const PatientConsultationNotesList = (props: PatientNotesProps) => {
  const {
    state,
    setState,
    reload,
    setReload,
    disableEdit,
    thread,
    setReplyTo,
    mode = "default-view",
    setThreadViewNote,
  } = props;
  const consultationId = useSlug("consultation") ?? "";

  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    setIsLoading(true);

    const { data } = await request(routes.getPatientNotes, {
      pathParams: {
        patientId: props.state.patientId || "",
      },
      query: {
        consultation: consultationId,
        thread,
        offset: (state.cPage - 1) * RESULTS_PER_PAGE_LIMIT,
      },
    });

    if (data) {
      if (state.cPage === 1) {
        setState((prevState) => ({
          ...prevState,
          notes: data.results,
          totalPages: Math.ceil(data.count / pageSize),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          notes: [...prevState.notes, ...data.results],
          totalPages: Math.ceil(data.count / pageSize),
        }));
      }
    }
    setIsLoading(false);
    setReload?.(false);
  };

  useEffect(() => {
    if (reload) {
      fetchNotes();
    }
  }, [reload]);

  useEffect(() => {
    fetchNotes();
  }, [thread]);

  useEffect(() => {
    setThreadViewNote?.("");
  }, [thread, mode]);

  useEffect(() => {
    setReload?.(true);
  }, []);

  const handleNext = () => {
    if (state.cPage < state.totalPages) {
      setState((prevState) => ({
        ...prevState,
        cPage: prevState.cPage + 1,
      }));
      setReload?.(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <CircularProgress />
      </div>
    );
  }

  return (
    <DoctorNote
      state={state}
      handleNext={handleNext}
      setReload={setReload}
      disableEdit={disableEdit}
      setReplyTo={setReplyTo}
      mode={mode}
      setThreadViewNote={setThreadViewNote}
    />
  );
};

export default PatientConsultationNotesList;