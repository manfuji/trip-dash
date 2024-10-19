function AmountStats({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-title">Amount to be Collected</div>
        <div className="stat-value">Ghc 25,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">View payments</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">Ghc 5,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">View payments</button>
        </div>
      </div>
    </div>
  );
}

export default AmountStats;
