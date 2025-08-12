/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;

const todayISO = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2);

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initialValue; } catch { return initialValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

const DEFAULT_EXERCISES = [
  { id: uid(), name: "Barbell Bench Press", category: "Chest" },
  { id: uid(), name: "Incline Dumbbell Press", category: "Chest" },
  { id: uid(), name: "Dumbbell Chest Press", category: "Chest" },
  { id: uid(), name: "Decline Bench Press", category: "Chest" },
  { id: uid(), name: "Chest Fly (Dumbbell)", category: "Chest" },
  { id: uid(), name: "Cable Fly (High-to-Low)", category: "Chest" },
  { id: uid(), name: "Push-up", category: "Chest" },
  { id: uid(), name: "Machine Chest Press", category: "Chest" },
  // Back
  { id: uid(), name: "Lat Pulldown", category: "Back" },
  { id: uid(), name: "Pull-up", category: "Back" },
  { id: uid(), name: "Seated Cable Row", category: "Back" },
  { id: uid(), name: "Bent-Over Barbell Row", category: "Back" },
  { id: uid(), name: "One-Arm Dumbbell Row", category: "Back" },
  { id: uid(), name: "T-Bar Row", category: "Back" },
  { id: uid(), name: "Deadlift (Conventional)", category: "Back" },
  { id: uid(), name: "Back Extension", category: "Back" },
  { id: uid(), name: "Face Pull", category: "Back" },
  { id: uid(), name: "Reverse Pec Deck / Rear Delt Fly", category: "Shoulders" },
  // Legs
  { id: uid(), name: "Back Squat", category: "Legs" },
  { id: uid(), name: "Front Squat", category: "Legs" },
  { id: uid(), name: "Leg Press", category: "Legs" },
  { id: uid(), name: "Romanian Deadlift", category: "Legs" },
  { id: uid(), name: "Walking Lunge", category: "Legs" },
  { id: uid(), name: "Bulgarian Split Squat", category: "Legs" },
  { id: uid(), name: "Leg Extension", category: "Legs" },
  { id: uid(), name: "Seated Leg Curl", category: "Legs" },
  { id: uid(), name: "Lying Leg Curl", category: "Legs" },
  { id: uid(), name: "Hip Thrust", category: "Legs" },
  { id: uid(), name: "Standing Calf Raise", category: "Legs" },
  { id: uid(), name: "Seated Calf Raise", category: "Legs" },
  // Shoulders
  { id: uid(), name: "Overhead Press (Barbell)", category: "Shoulders" },
  { id: uid(), name: "Dumbbell Shoulder Press", category: "Shoulders" },
  { id: uid(), name: "Arnold Press", category: "Shoulders" },
  { id: uid(), name: "Lateral Raise", category: "Shoulders" },
  { id: uid(), name: "Front Raise", category: "Shoulders" },
  { id: uid(), name: "Upright Row", category: "Shoulders" },
  // Arms
  { id: uid(), name: "Barbell Curl", category: "Arms" },
  { id: uid(), name: "Alternating Dumbbell Curl", category: "Arms" },
  { id: uid(), name: "Hammer Curl", category: "Arms" },
  { id: uid(), name: "Cable Curl", category: "Arms" },
  { id: uid(), name: "Triceps Pushdown", category: "Arms" },
  { id: uid(), name: "EZ-Bar Skullcrusher", category: "Arms" },
  { id: uid(), name: "Overhead Triceps Extension (DB)", category: "Arms" },
  { id: uid(), name: "Dips", category: "Arms" },
  // Core
  { id: uid(), name: "Plank", category: "Core" },
  { id: uid(), name: "Hanging Leg Raise", category: "Core" },
  { id: uid(), name: "Cable Crunch", category: "Core" },
  { id: uid(), name: "Russian Twist", category: "Core" },
  { id: uid(), name: "Ab Wheel Rollout", category: "Core" },
  { id: uid(), name: "Side Plank", category: "Core" },
  { id: uid(), name: "Crunch Machine", category: "Core" },
];

const DEFAULT_FOODS = [
  { id: uid(), name: "Chicken Breast (raw)", unit: "g", per: 100, kcal: 120, protein: 23, carbs: 0, fat: 2 },
  { id: uid(), name: "White Rice (cooked)", unit: "g", per: 100, kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: uid(), name: "Avocado", unit: "g", per: 100, kcal: 160, protein: 2, carbs: 9, fat: 15 },
  { id: uid(), name: "Kefir (plain)", unit: "g", per: 100, kcal: 60, protein: 3.5, carbs: 4.5, fat: 3 },
  { id: uid(), name: "Protein Powder (per scoop)", unit: "scoop", per: 30, kcal: 120, protein: 24, carbs: 3, fat: 1.5 },
  { id: uid(), name: "Blueberries", unit: "g", per: 100, kcal: 57, protein: 0.7, carbs: 14, fat: 0.3 },
  { id: uid(), name: "Cashews", unit: "g", per: 100, kcal: 553, protein: 18, carbs: 30, fat: 44 },
  { id: uid(), name: "Cottage Cheese (high-protein)", unit: "g", per: 100, kcal: 80, protein: 12, carbs: 3, fat: 1.5 },
  { id: uid(), name: "Breaded Chicken (store-bought)", unit: "g", per: 100, kcal: 210, protein: 16, carbs: 16, fat: 9 },
  { id: uid(), name: "Philadelphia (original)", unit: "g", per: 100, kcal: 235, protein: 5, carbs: 4, fat: 22 },
  { id: uid(), name: "Salmon (raw)", unit: "g", per: 100, kcal: 208, protein: 20, carbs: 0, fat: 13 },
  { id: uid(), name: "Pomegranate Seeds", unit: "g", per: 100, kcal: 83, protein: 1.7, carbs: 19, fat: 1.2 },
  { id: uid(), name: "Pistachios", unit: "g", per: 100, kcal: 560, protein: 20, carbs: 28, fat: 45 },
];

const DEFAULT_SETTINGS = { macroTargets: { kcal: 2600, protein: 180, carbs: 260, fat: 80 }, units: { weight: "kg" } };

function App(){
  const [date, setDate] = useState(todayISO());
  const [exercises, setExercises] = useLocalStorage("fit.exercises", DEFAULT_EXERCISES);
  const [workouts, setWorkouts] = useLocalStorage("fit.workouts", []);
  const [foods, setFoods] = useLocalStorage("fit.foods", DEFAULT_FOODS);
  const [foodLogs, setFoodLogs] = useLocalStorage("fit.foodLogs", []);
  const [energyLogs, setEnergyLogs] = useLocalStorage("fit.energyLogs", []);
  const [measurements, setMeasurements] = useLocalStorage("fit.measurements", []);
  const [settings, setSettings] = useLocalStorage("fit.settings", DEFAULT_SETTINGS);
  const [activeExerciseId, setActiveExerciseId] = useState(exercises[0]?.id || "");

  const workoutForDate = useMemo(()=> workouts.find(w=>w.date===date) || { date, entries: [] }, [workouts, date]);
  const upsertWorkout = (next) => setWorkouts(prev=>{ const i=prev.findIndex(w=>w.date===next.date); const n=[...prev]; if(i===-1) n.push(next); else n[i]=next; return n; });
  const lastSetsForExercise = (exerciseId)=>{ const hist=[...workouts].filter(w=>w.date!==date).sort((a,b)=>b.date.localeCompare(a.date)); for(const w of hist){ const rec=w.entries.find(e=>e.exerciseId===exerciseId); if(rec) return { date:w.date, sets: rec.sets }; } return null; };
  const totalsForDay = useMemo(()=>{ const log = foodLogs.find(f=>f.date===date) || { date, items: [] }; return log.items.reduce((a,it)=>{ a.kcal+=it.kcal; a.protein+=it.protein; a.carbs+=it.carbs; a.fat+=it.fat; return a; }, { kcal:0, protein:0, carbs:0, fat:0 }); }, [foodLogs, date]);

  return (
    <div className="container">
      <header className="row" style={{justifyContent:'space-between', marginBottom:16}}>
        <h1 style={{fontSize:24, fontWeight:700}}>Gym & Nutrition Tracker</h1>
        <div className="row">
          <label className="muted" style={{fontSize:14, marginRight:6}}>Date</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          <ExportImport all={{exercises,workouts,foods,foodLogs,energyLogs,measurements,settings}} onImport={(data)=>{ if(data.exercises) setExercises(data.exercises); if(data.workouts) setWorkouts(data.workouts); if(data.foods) setFoods(data.foods); if(data.foodLogs) setFoodLogs(data.foodLogs); if(data.energyLogs) setEnergyLogs(data.energyLogs); if(data.measurements) setMeasurements(data.measurements); if(data.settings) setSettings(data.settings); }} />
        </div>
      </header>

      <Tabs
        tabs={{
          workout: <WorkoutSection date={date} exercises={exercises} setExercises={setExercises} workout={workoutForDate} upsertWorkout={upsertWorkout} lastSetsForExercise={lastSetsForExercise} activeExerciseId={activeExerciseId} setActiveExerciseId={setActiveExerciseId} settings={settings} />,
          food: <FoodSection date={date} foods={foods} setFoods={setFoods} foodLogs={foodLogs} setFoodLogs={setFoodLogs} totalsForDay={totalsForDay} settings={settings} setSettings={setSettings} />,
          energy: <EnergySection date={date} energyLogs={energyLogs} setEnergyLogs={setEnergyLogs} />,
          measurements: <MeasurementsSection date={date} measurements={measurements} setMeasurements={setMeasurements} />,
          insights: <InsightsSection workouts={workouts} exercises={exercises} foodLogs={foodLogs} settings={settings} />,
        }}
      />
    </div>
  );
}

function Tabs({ tabs }){
  const keys = Object.keys(tabs);
  const [active, setActive] = useState(keys[0]);
  return (
    <div className="grid" style={{gap:12}}>
      <div className="tabs">
        {keys.map(k=> (
          <button key={k} onClick={()=>setActive(k)} className={"tab " + (active===k? "active":"")}>{k.charAt(0).toUpperCase()+k.slice(1)}</button>
        ))}
      </div>
      <div>{tabs[active]}</div>
    </div>
  );
}

function WorkoutSection({ date, exercises, setExercises, workout, upsertWorkout, lastSetsForExercise, activeExerciseId, setActiveExerciseId, settings }){
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseCat, setNewExerciseCat] = useState("Other");

  const addExerciseToDay = (exerciseId) => {
    const next = { ...workout };
    if (!next.entries) next.entries = [];
    if (!next.entries.find(e=>e.exerciseId===exerciseId)) {
      next.entries.push({ exerciseId, sets: [] });
      upsertWorkout(next);
    }
  };

  const addSet = (exerciseId, set) => {
    const next = { ...workout };
    const entry = next.entries.find(e => e.exerciseId === exerciseId);
    entry.sets.push(set);
    upsertWorkout(next);
  };

  const removeSet = (exerciseId, idx) => {
    const next = { ...workout };
    const entry = next.entries.find(e => e.exerciseId === exerciseId);
    entry.sets.splice(idx,1);
    upsertWorkout(next);
  };

  const eList = useMemo(() => {
    const cats = {};
    exercises.forEach(e => { (cats[e.category] ||= []).push(e); });
    return Object.entries(cats).sort((a,b)=>a[0].localeCompare(b[0]));
  }, [exercises]);

  useEffect(()=>{ if (!activeExerciseId && exercises[0]) setActiveExerciseId(exercises[0].id); }, [exercises]);

  const activeEntry = workout.entries.find(e=>e.exerciseId===activeExerciseId);
  const last = lastSetsForExercise(activeExerciseId);
  const activeExercise = exercises.find(e=>e.id===activeExerciseId);

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 2fr', gap:12}}>
      <div className="border rounded" style={{padding:12}}>
        <div className="row" style={{gap:8, marginBottom:12, alignItems:'flex-end'}}>
          <input placeholder="Exercise name (e.g., Incline DB Press)" value={newExerciseName} onChange={(e)=>setNewExerciseName(e.target.value)} style={{flex:1}} />
          <select value={newExerciseCat} onChange={(e)=>setNewExerciseCat(e.target.value)}>
            {['Chest','Back','Legs','Shoulders','Arms','Core','Other'].map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="btn" onClick={()=>{ if (!newExerciseName.trim()) return; setExercises(prev=>[...prev, { id: uid(), name: newExerciseName.trim(), category: newExerciseCat }]); setNewExerciseName(""); }}>Add</button>
        </div>

        {eList.map(([cat, items])=> (
          <div key={cat} className="border rounded" style={{padding:12, marginBottom:12}}>
            <div style={{fontWeight:600, marginBottom:8}}>{cat}</div>
            <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap:8}}>
              {items.map(it=> (
                <button key={it.id} className={"btn " + (activeExerciseId===it.id? "active":"")} onClick={()=>{ setActiveExerciseId(it.id); addExerciseToDay(it.id); }} style={activeExerciseId===it.id?{background:'#111',color:'#fff'}:{}}>{it.name}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded" style={{padding:12}}>
        <div className="row" style={{justifyContent:'space-between', marginBottom:12}}>
          <div style={{fontSize:16, fontWeight:600}}>{activeExercise?.name || "Select an exercise"}</div>
          <div className="muted" style={{fontSize:14}}>Units: {settings.units.weight}</div>
        </div>

        {last ? (
          <div className="border rounded" style={{padding:12, marginBottom:12}}>
            <div style={{fontWeight:600}}>Last session {last.date}:</div>
            <div className="row" style={{flexWrap:'wrap', gap:8, marginTop:8}}>
              {last.sets.map((s,i)=>(<span key={i} className="badge">{s.weight}{settings.units.weight} × {s.reps} reps</span>))}
            </div>
          </div>
        ) : <div className="muted" style={{marginBottom:12}}>No previous sets for this exercise.</div>}

        {activeEntry && (
          <div className="grid" style={{gap:12}}>
            <AddSetForm onAdd={(set)=>addSet(activeEntry.exerciseId, set)} settings={settings} />
            <div className="border rounded" style={{padding:12}}>
              <div style={{fontWeight:600, marginBottom:8}}>Today's sets</div>
              {activeEntry.sets.length===0 && <div className="muted">No sets yet.</div>}
              <div className="row" style={{flexWrap:'wrap', gap:8}}>
                {activeEntry.sets.map((s,i)=>(
                  <span key={i} className="badge" style={{display:'inline-flex', alignItems:'center', gap:6}}>{s.weight}{settings.units.weight} × {s.reps}
                    <button className="btn" onClick={()=>removeSet(activeEntry.exerciseId, i)} style={{padding:'2px 8px'}}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <ExerciseInsights exercise={activeExercise} currentSets={activeEntry.sets} />
          </div>
        )}
      </div>
    </div>
  );
}

function AddSetForm({ onAdd, settings }){
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  return (
    <div className="row" style={{alignItems:'flex-end'}}>
      <div>
        <div className="muted" style={{fontSize:12}}>Weight ({settings.units.weight})</div>
        <input inputMode="decimal" placeholder="e.g. 32.5" value={weight} onChange={(e)=>setWeight(e.target.value)} />
      </div>
      <div>
        <div className="muted" style={{fontSize:12}}>Reps</div>
        <input inputMode="numeric" placeholder="e.g. 10" value={reps} onChange={(e)=>setReps(e.target.value)} />
      </div>
      <button className="btn" onClick={()=>{ const w=parseFloat(weight); const r=parseInt(reps); if(!isFinite(w)||!isFinite(r)||r<=0) return; onAdd({ weight:w, reps:r }); setWeight(""); setReps(""); }}>Add set</button>
    </div>
  );
}

function FoodSection({ date, foods, setFoods, foodLogs, setFoodLogs, totalsForDay, settings, setSettings }){
  const [search, setSearch] = useState("");
  const [portion, setPortion] = useState("");
  const [selectFoodId, setSelectFoodId] = useState(foods[0]?.id || "");
  useEffect(()=>{ if (!selectFoodId && foods[0]) setSelectFoodId(foods[0].id); }, [foods]);

  const addFood = () => {
    const f = foods.find(x=>x.id===selectFoodId);
    const qty = parseFloat(portion);
    if (!f || !isFinite(qty) || qty<=0) return;
    const factor = qty / f.per;
    const entry = { id: uid(), foodId: f.id, name: f.name, qty, unit: f.unit,
      kcal: +(f.kcal*factor).toFixed(0), protein: +(f.protein*factor).toFixed(1), carbs: +(f.carbs*factor).toFixed(1), fat: +(f.fat*factor).toFixed(1) };
    setFoodLogs(prev=>{ const idx=prev.findIndex(l=>l.date===date); const next=[...prev]; if(idx===-1) next.push({ date, items:[entry] }); else next[idx]={ ...next[idx], items:[...next[idx].items, entry] }; return next; });
    setPortion("");
  };

  const dayLog = foodLogs.find(f=>f.date===date) || { date, items: [] };
  const filteredFoods = foods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:12}}>
      <div className="border rounded" style={{padding:12}}>
        <div className="grid" style={{gridTemplateColumns:'2fr 1fr 1fr', gap:8, marginBottom:12}}>
          <div className="row" style={{gap:8}}>
            <input placeholder="Search foods…" value={search} onChange={(e)=>setSearch(e.target.value)} style={{flex:1}} />
            <select value={selectFoodId} onChange={(e)=>setSelectFoodId(e.target.value)}>
              {filteredFoods.map(f=>(<option key={f.id} value={f.id}>{f.name}</option>))}
            </select>
          </div>
          <div className="row" style={{gap:8}}>
            <div style={{flex:1}}>
              <div className="muted" style={{fontSize:12}}>Portion (in {(foods.find(x=>x.id===selectFoodId)?.unit || 'g')})</div>
              <input inputMode="decimal" placeholder="e.g. 200" value={portion} onChange={(e)=>setPortion(e.target.value)} style={{width:'100%'}} />
            </div>
            <button className="btn" onClick={addFood}>Add</button>
          </div>
        </div>

        <div className="border rounded" style={{padding:12}}>
          {dayLog.items.length===0 && <div className="muted">No items yet.</div>}
          {dayLog.items.map(it=> (
            <div key={it.id} className="row" style={{justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight:600}}>{it.name}</div>
                <div className="muted">{it.qty}{it.unit}</div>
              </div>
              <div className="row" style={{gap:8}}>
                <span className="badge">kcal: {it.kcal}</span>
                <span className="badge">P: {it.protein}</span>
                <span className="badge">C: {it.carbs}</span>
                <span className="badge">F: {it.fat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Today's macros</div>
        <TargetRow name="Calories" value={totalsForDay.kcal} target={settings.macroTargets.kcal} suffix="kcal" />
        <TargetRow name="Protein" value={totalsForDay.protein} target={settings.macroTargets.protein} suffix="g" />
        <TargetRow name="Carbs" value={totalsForDay.carbs} target={settings.macroTargets.carbs} suffix="g" />
        <TargetRow name="Fat" value={totalsForDay.fat} target={settings.macroTargets.fat} suffix="g" />

        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
          {['kcal','protein','carbs','fat'].map(key=> (
            <label key={key} className="row" style={{gap:8}}>
              <span style={{width:60, textTransform:'capitalize'}}>{key}</span>
              <input value={settings.macroTargets[key]} onChange={(e)=>{
                const v = parseFloat(e.target.value)||0;
                const next = { ...settings, macroTargets: { ...settings.macroTargets, [key]: v } };
                localStorage.setItem('fit.settings', JSON.stringify(next));
                window.dispatchEvent(new Event('storage')); // hint
              }} />
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded" style={{padding:12, gridColumn:'1 / span 2'}}>
        <div style={{fontWeight:600, marginBottom:8}}>Manage foods</div>
        <FoodsManager foods={foods} setFoods={setFoods} />
      </div>
    </div>
  );
}

function TargetRow({ name, value, target, suffix }){
  const pct = Math.min(100, Math.round((value/Math.max(1,target))*100));
  return (
    <div style={{marginBottom:8}}>
      <div className="row" style={{justifyContent:'space-between', fontSize:14, marginBottom:4}}><span>{name}</span><span>{value} / {target} {suffix}</span></div>
      <div style={{width:'100%', height:8, background:'#e5e7eb', borderRadius:999, overflow:'hidden'}}>
        <div style={{height:8, width:`${pct}%`, background:'#111'}} />
      </div>
    </div>
  );
}

function FoodsManager({ foods, setFoods }){
  const blank = { id: "", name: "", unit: "g", per: 100, kcal: 0, protein: 0, carbs: 0, fat: 0 };
  const [draft, setDraft] = useState(blank);

  const add = () => {
    if (!draft.name) return;
    setFoods(prev=>[...prev, { ...draft, id: uid(), per: Number(draft.per)||100, kcal:+draft.kcal, protein:+draft.protein, carbs:+draft.carbs, fat:+draft.fat }]);
    setDraft(blank);
  };

  const remove = (id) => setFoods(prev=>prev.filter(f=>f.id!==id));

  return (
    <div className="grid" style={{gap:8}}>
      <div className="grid" style={{gridTemplateColumns:'1fr 100px 100px 80px 80px 80px 80px', gap:8}}>
        <input placeholder="Name" value={draft.name} onChange={(e)=>setDraft(d=>({...d, name: e.target.value}))} />
        <select value={draft.unit} onChange={(e)=>setDraft(d=>({...d, unit:e.target.value}))}>
          {['g','ml','scoop','piece','slice'].map(u=> <option key={u} value={u}>{u}</option>)}
        </select>
        <input placeholder="Per (e.g. 100)" value={draft.per} onChange={(e)=>setDraft(d=>({...d, per: e.target.value}))} />
        <input placeholder="kcal" value={draft.kcal} onChange={(e)=>setDraft(d=>({...d, kcal: e.target.value}))} />
        <input placeholder="Protein" value={draft.protein} onChange={(e)=>setDraft(d=>({...d, protein: e.target.value}))} />
        <input placeholder="Carbs" value={draft.carbs} onChange={(e)=>setDraft(d=>({...d, carbs: e.target.value}))} />
        <input placeholder="Fat" value={draft.fat} onChange={(e)=>setDraft(d=>({...d, fat: e.target.value}))} />
      </div>
      <button className="btn" onClick={add}>Add food</button>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:8}}>
        {foods.map(f=> (
          <div key={f.id} className="border rounded" style={{padding:12, fontSize:14, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600}}>{f.name}</div>
              <div className="muted">per {f.per}{f.unit}: {f.kcal} kcal, P{f.protein} C{f.carbs} F{f.fat}</div>
            </div>
            <button className="btn" onClick={()=>remove(f.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnergySection({ date, energyLogs, setEnergyLogs }){
  const [activity, setActivity] = useState("");
  const [cal, setCal] = useState("");
  const day = energyLogs.find(e=>e.date===date) || { date, items: [] };

  const add = () => {
    const kc = parseInt(cal);
    if (!activity || !isFinite(kc) || kc<=0) return;
    const entry = { id: uid(), activity, kcal: kc };
    setEnergyLogs(prev=>{ const idx=prev.findIndex(d=>d.date===date); const next=[...prev]; if(idx===-1) next.push({ date, items:[entry] }); else next[idx] = { ...next[idx], items:[...next[idx].items, entry] }; return next; });
    setActivity(""); setCal("");
  };

  const total = day.items.reduce((a,b)=>a+b.kcal,0);

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Energy expenditure — {date}</div>
        <div className="row" style={{gap:8, marginBottom:12}}>
          <input placeholder="Activity (e.g., Football)" value={activity} onChange={(e)=>setActivity(e.target.value)} />
          <input placeholder="kcal" inputMode="numeric" value={cal} onChange={(e)=>setCal(e.target.value)} />
          <button className="btn" onClick={add}>Add</button>
        </div>
        <div className="border rounded" style={{padding:12, fontSize:14}}>
          {day.items.length===0 && <div className="muted">No entries yet.</div>}
          {day.items.map(it=> (
            <div key={it.id} className="row" style={{justifyContent:'space-between'}}><span>{it.activity}</span><span>{it.kcal} kcal</span></div>
          ))}
          <div className="row" style={{justifyContent:'space-between', marginTop:8, paddingTop:8, borderTop:'1px solid #eee'}}><span style={{fontWeight:600}}>Total</span><span>{total} kcal</span></div>
        </div>
      </div>

      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Balance snapshot</div>
        <div className="muted" style={{fontSize:14}}>Compare with your logged calorie intake (Food tab).</div>
      </div>
    </div>
  );
}

function MeasurementsSection({ date, measurements, setMeasurements }){
  const latest = [...measurements].sort((a,b)=>b.date.localeCompare(a.date))[0];
  const [draft, setDraft] = useState(latest || { date, weight: "", chest:"", waist:"", hips:"", bicepL:"", bicepR:"", thighL:"", thighR:"" });
  useEffect(()=>{ setDraft(d=>({...d, date})); }, [date]);

  const save = () => {
    const clean = { ...draft, weight: n(draft.weight), chest:n(draft.chest), waist:n(draft.waist), hips:n(draft.hips), bicepL:n(draft.bicepL), bicepR:n(draft.bicepR), thighL:n(draft.thighL), thighR:n(draft.thighR) };
    setMeasurements(prev=>{ const idx=prev.findIndex(x=>x.date===clean.date); const next=[...prev]; if (idx===-1) next.push(clean); else next[idx]=clean; return next; });
  };

  const hist = [...measurements].sort((a,b)=>a.date.localeCompare(b.date));

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Body measurements — {date}</div>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:8, fontSize:14}}>
          {[
            ["Body weight (kg)","weight"],["Chest (cm)","chest"],["Waist (cm)","waist"],["Hips (cm)","hips"],["Bicep L (cm)","bicepL"],["Bicep R (cm)","bicepR"],["Thigh L (cm)","thighL"],["Thigh R (cm)","thighR"]
          ].map(([label,key])=> (
            <label key={key} className="grid" style={{gap:4}}>
              <span className="muted" style={{fontSize:12}}>{label}</span>
              <input inputMode="decimal" value={String(draft[key]||'')} onChange={(e)=>setDraft(d=>({...d, [key]: e.target.value}))} />
            </label>
          ))}
        </div>
        <button className="btn" style={{marginTop:8}} onClick={save}>Save measurements</button>
      </div>

      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Weight history</div>
        <div style={{fontSize:14, maxHeight:260, overflow:'auto'}}>
          {hist.length===0 ? <div className="muted">No entries yet.</div> : hist.map((h,i)=>(<div key={i} className="row" style={{justifyContent:'space-between'}}><span>{h.date}</span><span>{h.weight}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function InsightsSection({ workouts, exercises, foodLogs, settings }){
  const volumeByDayByExercise = useMemo(()=>{
    const res = {};
    workouts.forEach(w=>{ w.entries?.forEach(e=>{ const ex = exercises.find(x=>x.id===e.exerciseId)?.name || 'Unknown'; const vol = e.sets.reduce((a,s)=>a+s.weight*s.reps,0); (res[ex] ||= []).push({ date:w.date, volume:Math.round(vol) }); }); });
    return res;
  },[workouts,exercises]);

  const macroSeries = useMemo(()=> foodLogs.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(d=>({ date:d.date, kcal: sum(d.items,'kcal'), P:sum(d.items,'protein'), C:sum(d.items,'carbs'), F:sum(d.items,'fat') })), [foodLogs]);

  const firstExercise = Object.keys(volumeByDayByExercise)[0];

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Training volume — {firstExercise || 'No data yet'}</div>
        <div style={{fontSize:14, maxHeight:260, overflow:'auto'}}>
          {firstExercise ? volumeByDayByExercise[firstExercise].sort((a,b)=>a.date.localeCompare(b.date)).map((d,i)=>(<div key={i} className="row" style={{justifyContent:'space-between'}}><span>{d.date}</span><span>{d.volume}</span></div>)) : <div className="muted">Log some workouts to see trends.</div>}
        </div>
      </div>

      <div className="border rounded" style={{padding:12}}>
        <div style={{fontWeight:600, marginBottom:8}}>Daily macros</div>
        <div style={{fontSize:14, maxHeight:260, overflow:'auto'}}>
          {macroSeries.length===0 ? <div className="muted">No food logs yet.</div> : macroSeries.map((d,i)=>(<div key={i} className="row" style={{justifyContent:'space-between'}}><span>{d.date}</span><span>{d.kcal} kcal (P{d.P} C{d.C} F{d.F})</span></div>))}
        </div>
        <div className="muted" style={{fontSize:12, marginTop:8}}>Target calories: {settings.macroTargets.kcal} kcal.</div>
      </div>
    </div>
  );
}

function ExerciseInsights({ exercise, currentSets }){
  const estimate1RM=(w,r)=> w*(1+r/30);
  const allSets=[];
  try {
    const ws = JSON.parse(localStorage.getItem("fit.workouts")||"[]");
    ws.forEach(w=> w.entries?.forEach(e=>{ if (e.exerciseId === exercise?.id) e.sets.forEach(s=>allSets.push({ date:w.date, ...s })); }));
  } catch {}
  currentSets?.forEach(s=> allSets.push({ date: todayISO(), ...s }));
  const best = allSets.reduce((acc,s)=>{ const est=estimate1RM(s.weight,s.reps); return est>acc.est?{ ...s, est }:acc; }, { est:0 });
  const volToday = currentSets?.reduce((a,s)=>a+s.weight*s.reps,0) || 0;

  return (
    <div className="border rounded" style={{padding:12, fontSize:14}}>
      <div style={{fontWeight:600, marginBottom:6}}>Exercise insights</div>
      <div className="row" style={{gap:8, flexWrap:'wrap'}}>
        <span className="badge">Today volume: {Math.round(volToday)}</span>
        <span className="badge">Best est. 1RM: {best.est?Math.round(best.est):"–"}</span>
        {best.est ? <span className="badge">Best set: {best.weight}×{best.reps}</span> : null}
      </div>
    </div>
  );
}

function ExportImport({ all, onImport }){
  const exportData = () => {
    const blob = new Blob([JSON.stringify(all,null,2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `tracker-export-${todayISO()}.json`; a.click(); URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e)=>{ try { const data = JSON.parse(e.target.result); onImport?.(data); } catch { alert('Invalid JSON'); } };
    reader.readAsText(file);
  };

  return (
    <div className="row" style={{gap:8, marginLeft:8}}>
      <button className="btn" onClick={exportData}>Export</button>
      <label className="btn">
        Import
        <input type="file" accept="application/json" style={{display:'none'}} onChange={(e)=>{ const f=e.target.files?.[0]; if (f) importData(f); }} />
      </label>
    </div>
  );
}

function n(v){ const x = parseFloat(v); return isFinite(x)?x:0; }
function sum(arr, key){ return arr.reduce((a,b)=>a + (b[key]||0), 0); }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
