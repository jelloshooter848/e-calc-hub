# Pull Box Auto‑Arrange Logic Decision Tree

_Read from top to bottom. Every branch ends in a clear next action or a “STOP.” 


##Priority 1
U-PULL: Left-to-Left
U-PULL: Right-to-Right
U-PULL: Top-to-Top
U-PULL: Bottom-to-Bottom

##Priority 2
ANGLE: Left-to-Top
ANGLE: Left-to-Bottom
ANGLE: Right-to-Top
ANGLE: Right-to-Bottom

##Priority 3
STRAIGHT: Left-to-Right
STRAIGHT: Top-to-Bottom

##Priority 4
REAR: Left-to-Rear
REAR: Top-to-Rear
REAR: Right-to-Rear
REAR: Bottom-to-Rear

##Priority 5
U-PULL: Rear-to-Rear

##Fundamental rule for complex pulls:  No lockringODspacing of any conduits on any shared wall can overlap.

---

## Step 0 – Decide whether this is a **simple** or **complex** pull

1. **IF** all conduits belong to the **same** priority list (only 1, only 2, etc.)  
   **THEN** run the existing single‑priority auto‑arrange → **STOP**.  
2. **ELSE** (two or more different priorities are present)  
   **THEN** set **complex‑mode = ON** and continue to Step&nbsp;1.

---

## Step 1 – Priority 1

1. **IF** there are **no** Priority 1 conduits  
   **THEN** go to Step 2.  
2. **ELSE** (Priority 1 conduits exist)  
   * Arrange every Priority 1 conduit exactly as in single‑priority jobs using `optimizeSidewallUPullsWithSpreadStrategy()`.  
   * Mark the wall zones they occupy as “taken by P1.”  
   * Go to Step 2.

---

## Step 2 – Priority 2 

1. **IF** there are **no** Priority 2 conduits  
   **THEN** go to Step 3.  
2. **ELSE** (Priority 2 conduits exist)  
   * **IF** the job contains **no** Priority 1 conduits  
     **THEN** arrange Priority 2 conduits the normal way using `optimizeAnglePullsWithClustering()` → go to Step 3.  
   * **ELSE** (Priority 1 conduits are present)  
     * For each Priority 2 conduit:  
       - **IF** its wall is **not shared** with any Priority 1 conduit  
         **THEN** arrange it normally using `optimizeAnglePullsWithClustering()`.  
       - **IF** its wall **is shared** with Priority 1  
         **THEN** place all Priority 2 conduits on that wall **as close as they can be to their ideal placemtnplacement, pushing away fromt he nearest p1 conduit**, and making sure no lockringODspacings overlap for any conduits.  
     * Mark those wall zones “taken by P2.”  
     * Go to Step 3.

---

## Step 3 – Priority 3 

1. **IF** there are **no** Priority 3 conduits  
   **THEN** go to priority 4.  
2. **ELSE** (Priority 3 conduits exist)  
     **IF** the job contains **no** Priority 1 **and** **no** Priority 2 conduits  
     **THEN** arrange Priority 3 conduits the normal way using `optimizeStraightPullsWithLinearAlignment()` → go to priority 4.  
     **ELSE** (at least one of Priority 1 or 2 is present)  
        **IF**there no priority 4 conduits
        **THEN** arrange priotrity 3 conduits using the following logic
            * For each Priority 3 conduit:  
            **IF** a priotrity 3 conduit does not have walls shared with P1 or P2 conduits
            **THEN** arrange it normally using `optimizeStraightPullsWithLinearAlignment()`.  
            **ELSE** any priority 1 conduits DO share walls with p1 or p2 conduits
              **IF** p3 conduits do share walls with p1 or p2 conduits 
              **THEN** find conflict zones with p1 and p2 conduits on the shared wall and  arrange them normally using `optimizeStraightPullsWithLinearAlignment()` but center the group of p3 conduits in the no conflict zone.  → go to priority 4.  
       **ELSE** there ARE priority 4 conduits
         **IF** priority 4 conduits do not share any walls with the p3 conduits
         **then** arrange them normally using `optimizeStraightPullsWithLinearAlignment()` for p3 conduits and `optimizeSideToRearPullsWithLinearPacking()` for p4 conduits respecitevly
         **ELSE** p4 conduits do share a wall with p3 conduits
           **IF** P4 conduits do share a wall with p3 conduits
           **then** arrange p3 AND p4 conduits using the following logic.
              * Consider each side wall separately
              **IF** a priotrity 3 and 4 conduit share a wall with p1 and/or p2 conduits
              **THEN** find conflict zones with p1 and p2 conduits on the shared wall and using `optimizeStraightPullsWithLinearAlignment()` for p3 conduits and `optimizeSideToRearPullsWithLinearPacking()` for p4 conduits respecitevly, but center the p3 AND p4 conduits in the no conflict zone.  p4 condut rear exits should be straight accross from their sidewall entrance  → go to priority 4.  
              

---

## Step 4 – Priority 4 

1. **IF** there are **no** Priority 4 conduits  
   **THEN** go to Step 5.  
2. **ELSE** (Priority 4 conduits exist)  
   * **IF** the job contains **no** Priority 1, 2, or 3 conduits  
     **THEN** arrange Priority 4 conduits the normal way using `optimizeSideToRearPullsWithLinearPacking()`  → go to Step 5.  
   * **ELSE** (one or more higher priorities present)  
     * For each Priority 4 conduit:  
       - **IF** its wall is **not shared** with P1, P2, or P3  
         **THEN** arrange it normally using `optimizeSideToRearPullsWithLinearPacking()`.  
       - **IF** its wall is shared with **only Priority 1** *or* **only Priority 2**  
         **THEN** center the Priority 4 group on that wall; keep clear of the higher priority.  
       - **IF** its wall is shared with a mix such as P1+P2, P1+P3, or P2+P3  
         **THEN** nest the Priority 4 conduits alongside the already‑centered lower‑priority conduits, pushing away from the closest P1 or P2.  
     * Mark zones “taken by P4.”  
     * Go to Step 5.

---

## Step 5 – Priority 5 

1. **IF** there are **no** Priority 5 conduits  
   **THEN** **STOP** – placement complete.  
2. **ELSE** (Priority 5 conduits exist)  
   * **IF** the job contains **no** Priority 1, 2, 3, or 4 conduits  
     **THEN** arrange Priority 5 conduits the normal way  using `optimizeRearToRearPullsWithLinearPacking()`→ **STOP**.  
   * **ELSE** (one or more higher priorities present)  
     * For each Priority 5 conduit:  
       - **IF** its wall is **not shared** with any higher priority  
         **THEN** arrange it normally using `optimizeRearToRearPullsWithLinearPacking()`.  
       - **IF** its wall is shared with **only Priority 1** *or* **only Priority 2**  
         **THEN** center the Priority 5 group on that wall.  
       - **IF** its wall is shared with **any combination** of higher priorities (e.g., P1+P2, P1+P3+P4, etc.)  
         **THEN** tuck the Priority 5 conduits alongside the already‑placed lower‑priority conduits, always shifting **away from the closest P1 or P2** and maintaining clear lockring spacing.  

**STOP – all priorities processed.**
