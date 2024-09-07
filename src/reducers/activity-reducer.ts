import { Actividad } from "../types";
export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Actividad };
    }
  | {
      type: "set-activity";
      payload: { id: Actividad["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Actividad["id"] };
    };

export type ActivityState = {
  activities: Actividad[];
  activeId: Actividad["id"];
};

const localStorageActivities = (): Actividad[] => {
  const activities = localStorage.getItem("actividades");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Actividad[] = [];

    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activity") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  return state;
};
